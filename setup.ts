import { $ } from "bun";

console.log("\n\n --- Running setup v4 --- \n\n");

$.env({
  ...process.env,
  HOME: process.env.HOME || `/Users/${process.env.USER || 'ian'}`,
  PATH: `/opt/homebrew/bin/brew:${process.env.PATH}`,
});

// Install Bun if not already installed.
const bunCheck = await $`which bun`.quiet();
if (bunCheck.exitCode !== 0) {
  await $`curl -fsSL https://bun.sh/install | bash`;
} else {
  console.log("Bun already installed. Skipping installation.");
}

// Install Homebrew if not already installed.
const brewCheck = await $`which brew`.quiet();
if (brewCheck.exitCode !== 0) {
  await $`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`;
  await $`echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile`;
} else {
  console.log("Homebrew already installed. Skipping installation.");
}

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
await $`brew install openjdk@17`;
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
const zshrc = /* bash */ `
# Setup word skipping using <Alt><RightArrow> and <Alt><LeftArrow> to behave
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

// Copy git configuration to ~/.gitconfig.
const gitconfig = /* ini */ `
[push]
  default = current
  autoSetupRemote = true

[pull]
  rebase = false

[alias]
  # View abbreviated SHA, description, and history graph of the latest 20
  # commits.
  l = log --pretty=oneline -n 20 --graph --abbrev-commit
  # View the current working tree status using the short format.
  s = status -s
  # Switch to a branch, creating it if necessary.
  go = "!f() { git checkout -b \"$1\" 2> /dev/null || git checkout \"$1\"; }; f"
  # Show verbose output about tags, branches or remotes.
  tags = tag -l
  branches = branch -a
  remotes = remote -v
  # Amend the currently staged files to the latest commit.
  amend = commit --amend --reuse-message=HEAD
  # Remove the old tag with this name and tag the latest commit with it.
  retag = "!r() { git tag -d $1 && git push origin :refs/tags/$1 && git tag $1; }; r"
  # Remove branches that have already been merged with main AKA
  # 'delete merged'.
  dm = "!git checkout $1 && git branch --merged | grep -v '\\*' | xargs -n 1 git branch -d && git checkout -"
  # List contributors with number of commits.
  contributors = shortlog --summary --numbered
  # Blow away everything including untracked files and directories.
  clear = clean -f -d
  # Fetch a branch and check it out.
  switch = !sh -c 'git fetch $1 $2 && git checkout $2' -

[user]
  name = Ian Walter
	email = 122028+ianwalter@users.noreply.github.com

[core]
  ignorecase = false

[rerere]
  enabled = true

[init]
	defaultBranch = main
`;
await $`echo ${gitconfig} > ~/.gitconfig`;

// Configure Ghostty.
const ghostty = /* bash */ `
# Fonts
font-family = "MonoLisa"
font-size = 16

# Theme
theme = catppuccin-mocha

# Window
window-padding-balance = true
window-padding-x = 4
window-padding-y = 4
`;
await $`echo ${ghostty} > ~/Library/Application\ Support/com.mitchellh.ghostty/config`;

// Open Ghostty.
await $`open /Applications/Ghostty.app`;

console.log("\n\n --- Setup complete --- \n\n");
