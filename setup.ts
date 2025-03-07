import { $ } from "bun";

// Install Bun.
await $`curl -fsSL https://bun.sh/install | bash`;

// Install Homebrew.
await $`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`;

// Install Homebrew Formulae.
await $`brew install eza` // A better ls command.
await $`brew install gh`; // GitHub CLI.
await $`brew install git`; // Source control.
await $`brew install go`; // Go language.
await $`brew install jq`; // JSON utility.
await $`brew install starship` // Shell prompt.
await $`brew install trash` // A better rm command.
await $`brew install zoxide` // A better cd command.

// Install Homebrew Casks.
await $`brew install 1password`;
await $`brew install 1password-cli`;
await $`brew install android-studio`;
await $`brew install cursor`;
await $`brew install elgato-stream-deck`;
await $`brew install ghostty`;
await $`brew install logi-options+`;
await $`brew install ollama`;
await $`brew install orbstack`;
await $`brew install raycast`;
await $`brew install sensei`;
await $`brew install spotify`;
await $`brew install steam`;
await $`brew install tableplus`;
await $`brew install visual-studio-code`;
await $`brew install zed`;
await $`brew install zen-browser`;
await $`brew install zoom`;

// Copy zsh configuration to ~/.zshrc.
const zshrc =
`# Setup word skipping using <Alt><RightArrow> and <Alt><LeftArrow> to behave
# like macOS.
# https://stackoverflow.com/questions/12382499/looking-for-altleftarrowkey-solution-in-zsh
bindkey '[C' forward-word
bindkey '[D' backward-word

# Setup command history cycling using <Alt><UpArrow> and <Alt><DownArrow>.
bindkey '[A' history-beginning-search-backward
bindkey '[B' history-beginning-search-forward

# Setup aliases to use alternative utilities.
alias ls='eza'
alias rm='trash'
alias cd='z'

# Configure zsh command history.
# File to save command history.
HISTFILE=~/.zsh_history
# How many commands are loaded into shell memory.
HISTSIZE=5000
# How many commands to save to the history file.
SAVEHIST=5000
# Append history to the history file (don't overwrite).
setopt APPEND_HISTORY
# Immediately append to the history file, not just when a terminal is killed.
setopt INC_APPEND_HISTORY
# Share history across sessions.
setopt SHARE_HISTORY
# Also save when the command started and how long it ran for.
setopt EXTENDED_HISTORY
# Don't save a history line if it's the same as the previous one.
setopt HIST_IGNORE_DUPS
# When history fills up, remove duplicate commands first.
setopt HIST_EXPIRE_DUPS_FIRST
# Remove meaningless whitespace from command history.
setopt HIST_REDUCE_BLANKS

# Set vim as the default editor.
export EDITOR=vim

# Add binaries to the PATH so they are always accessible.
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
export PATH="/opt/homebrew/opt/trash/bin:$PATH"
export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"

# Setup zoxide completions.
eval "$(zoxide init zsh)"

# Use the Starship prompt.
eval "$(starship init zsh)"
`;
await $`echo ${zshrc} > ~/.zshrc`;

// Activate zsh configuration.
await $`source ~/.zshrc`
