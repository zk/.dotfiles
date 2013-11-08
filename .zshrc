# Path to your oh-my-zsh configuration.
ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
# ZSH_THEME="robbyrussell"

# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

# Set to this to use case-sensitive completion
# CASE_SENSITIVE="true"

# Uncomment this to disable bi-weekly auto-update checks
DISABLE_AUTO_UPDATE="true"

# Uncomment to change how often before auto-updates occur? (in days)
# export UPDATE_ZSH_DAYS=13

# Uncomment following line if you want to disable colors in ls
# DISABLE_LS_COLORS="true"

# Uncomment following line if you want to disable autosetting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment following line if you want to disable command autocorrection
# DISABLE_CORRECTION="true"

# Uncomment following line if you want red dots to be displayed while waiting for completion
# COMPLETION_WAITING_DOTS="true"

# Uncomment following line if you want to disable marking untracked files under
# VCS as dirty. This makes repository status check for large repositories much,
# much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
plugins=(git heroku lein brew colorize gem tmux)

source $ZSH/oh-my-zsh.sh

# Customize to your needs...
export PATH=$PATH:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin

alias kat="colorize $@"

PROMPT='%{$fg_bold[black]%}%n@%m%{$fg[cyan]%}:%p%{$fg[blue]%}%~ $(git_prompt_info)$(git_prompt_status)%{$fg_bold[white]%}λ %{$reset_color%}'

function displaytime {
    local T=$1
    local D=$((T/60/60/24))
    local H=$((T/60/60%24))
    local M=$((T/60%60))
    local S=$((T%60))

    [[ $D > 0 ]] && DS=`printf '%dd ' $D`
    [[ $H > 0 ]] && HS=`printf '%dh ' $H`
    [[ $M > 0 ]] && MS=`printf '%dm ' $M`
    SS=`printf '%ds\n' $S`

    echo "$DS$HS$MS$SS"
}

function preexec() {
    timer=${timer:-$SECONDS}
}

function precmd() {
    LAST_EXIT=$?
    RPROMPT=""
    if [ $LAST_EXIT -ne 0 ]; then
        RPROMPT=" %{$fg_bold[red]%}$LAST_EXIT"
    fi

    if [ $timer ]; then
        timer_show=$(($SECONDS - $timer))
        [[ $timer_show > 3 ]] && RPROMPT="$RPROMPT $(displaytime timer_show)"
        unset timer
    fi

    [[ -n $RPROMPT ]] && RPROMPT="%{$fg_bold[red]%}[$RPROMPT %{$fg_bold[red]%}]%{$reset_color%}"
}

ZSH_THEME_GIT_PROMPT_PREFIX="%{$fg[green]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%} "
ZSH_THEME_GIT_PROMPT_DIRTY="*"
ZSH_THEME_GIT_PROMPT_CLEAN=""

# ZSH_THEME_GIT_PROMPT_ADDED="%{$FG[082]%}%{$reset_color%}"
# ZSH_THEME_GIT_PROMPT_DELETED="%{$FG[160]%}%{$reset_color%}"
# ZSH_THEME_GIT_PROMPT_RENAMED="%{$FG[220]%}%{$reset_color%}"
# ZSH_THEME_GIT_PROMPT_UNMERGED="%{$FG[082]%}%{$reset_color%}"
# ZSH_THEME_GIT_PROMPT_UNTRACKED="%{$FG[190]%} %{$reset_color%}"

REPORTTIME=3
