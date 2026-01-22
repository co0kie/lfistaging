import React, { useState, useEffect, useRef } from "react";
import { actions } from "astro:actions";
import { MessageSquare, X, Send, Loader2, ShieldCheck, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
	role: "user" | "model";
	parts: { text: string }[];
}

const ChatWidget: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSend = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userMessage: Message = { role: "user", parts: [{ text: input }] };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		try {
			const { data, error } = await actions.chat({
				message: input,
				history: messages,
			});

			if (error) {
				console.error("Chat Error:", error);
				setMessages((prev) => [
					...prev,
					{
						role: "model",
						parts: [{ text: "Sorry, I encountered an error. Please try again later." }],
					},
				]);
			} else if (data) {
				setMessages((prev) => [...prev, data as Message]);
			}
		} catch (err) {
			console.error("Unexpected Error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="fixed right-6 bottom-6 z-[9999] flex flex-col items-end">
			{/* Chat Window */}
			{isOpen && (
				<div className="animate-in fade-in slide-in-from-bottom-5 mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-orange-500/30 bg-[#1a1c1e] shadow-2xl transition-all duration-300 sm:w-[400px]">
					{/* Header */}
					<div className="flex items-center justify-between bg-gradient-to-r from-orange-600 to-orange-500 p-4 text-white">
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-white/20 p-2">
								<ShieldCheck size={20} />
							</div>
							<div>
								<h3 className="leading-none font-bold">Tactical AI</h3>
								<span className="text-xs text-orange-100">Certified Firearm Instructor</span>
							</div>
						</div>
						<button
							onClick={() => setIsOpen(false)}
							className="rounded-lg p-1 transition-colors hover:bg-white/20"
						>
							<X size={20} />
						</button>
					</div>

					{/* Messages Area */}
					<div className="flex-1 space-y-4 overflow-y-auto bg-[#1a1c1e] p-4">
						{messages.length === 0 && (
							<div className="flex h-full flex-col items-center justify-center px-4 text-center opacity-60">
								<ShieldCheck size={48} className="mb-4 text-orange-500" />
								<p className="text-sm text-gray-400">
									Stay Safe. Speak with Tactical AI about gun safety, drills, or firearm
									maintenance.
								</p>
							</div>
						)}
						{messages.map((msg, idx) => (
							<div
								key={idx}
								className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
										msg.role === "user"
											? "bg-orange-600 text-white"
											: "border border-gray-700 bg-gray-800 text-gray-200"
									}`}
								>
									<div className="prose prose-sm prose-invert max-w-none">
										<ReactMarkdown
											components={{
												p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
												ul: ({ children }) => (
													<ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>
												),
												ol: ({ children }) => (
													<ol className="mb-2 ml-4 list-decimal space-y-1">{children}</ol>
												),
												li: ({ children }) => <li>{children}</li>,
												strong: ({ children }) => (
													<strong className="font-bold text-orange-400">{children}</strong>
												),
												h1: ({ children }) => (
													<h1 className="mb-2 text-lg font-bold">{children}</h1>
												),
												h2: ({ children }) => (
													<h2 className="mb-2 text-base font-bold">{children}</h2>
												),
												h3: ({ children }) => (
													<h3 className="mb-1 text-sm font-bold">{children}</h3>
												),
												code: ({ children }) => (
													<code className="rounded bg-black/30 px-1 py-0.5 font-mono text-xs">
														{children}
													</code>
												),
											}}
										>
											{msg.parts[0].text}
										</ReactMarkdown>
									</div>
								</div>
							</div>
						))}
						{isLoading && (
							<div className="flex justify-start">
								<div className="flex items-center gap-2 rounded-2xl border border-gray-700 bg-gray-800 px-4 py-2 text-gray-400">
									<Loader2 size={16} className="animate-spin text-orange-500" />
									<span className="text-xs">Processing...</span>
								</div>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>

					{/* Input Area */}
					<form onSubmit={handleSend} className="border-t border-gray-800 bg-[#121416] p-4">
						<div className="relative flex items-center">
							<input
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Type your question..."
								className="w-full rounded-xl border border-gray-700 bg-gray-900 py-3 pr-12 pl-4 text-sm text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
							/>
							<button
								type="submit"
								disabled={isLoading || !input.trim()}
								className="absolute right-2 rounded-lg bg-orange-600 p-2 text-white transition-all hover:bg-orange-500 disabled:opacity-50"
							>
								<Send size={18} />
							</button>
						</div>
						<p className="mt-2 text-center text-[10px] tracking-wider text-gray-500 uppercase">
							Safe Handling • Professional Advice • Tactical Support
						</p>
					</form>
				</div>
			)}

			{/* Toggle Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
					isOpen
						? "scale-90 rotate-90 bg-gray-800 text-white"
						: "bg-orange-600 text-white hover:scale-110 hover:bg-orange-500"
				}`}
			>
				<MessageSquare size={24} />
			</button>
		</div>
	);
};

export default ChatWidget;
