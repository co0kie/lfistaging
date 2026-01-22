$path = "C:\Users\jechu\.ssh\config"
# Reset inheritance and remove all inherited permissions
icacls $path /reset
# Grant full access to the current user
icacls $path /grant:r "${env:USERNAME}:(F)"
# Disable inheritance and remove all other inherited permissions
icacls $path /inheritance:r
# Ensure only the current user has access (sometimes /inheritance:r might leave some, so we ensure the user is there)
icacls $path /grant:r "${env:USERNAME}:(F)"
# Optional: Grant SYSTEM full access as well, which is usually fine for SSH
icacls $path /grant:r "SYSTEM:(F)"