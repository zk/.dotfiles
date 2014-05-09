# set allthecolors
export TERM=xterm-256color

export GOPATH=/Users/zk/gocode

# Helpers for showing branch / dirty status in prompt
source ~/.dotfiles/git-prompt.sh

# Helpers for git branch, etc tab completion
source ~/.dotfiles/git-completion.sh

# ZSH-like preexec hook
source ~/.dotfiles/preexec.sh

function displaytime {
    local T=$1
    local D=$((T/60/60/24))
    local H=$((T/60/60%24))
    local M=$((T/60%60))
    local S=$((T%60))

    [[ $D > 0 ]] && printf -v DS '%dd ' $D
    [[ $H > 0 ]] && printf -v HS'%dh ' $H
    [[ $M > 0 ]] && printf -v MS '%dm ' $M
    printf -v SS '%ds\n' $S

    echo "$DS$HS$MS$SS"
}

function my_prompt {
    # Exit code of last command, must be at the beginning of prompt
    local LAST_EXIT="$?"

    local BLACK="\[\033[0;30m\]"
    local BLACKBOLD="\[\033[1;30m\]"
    local RED="\[\033[0;31m\]"
    local REDBOLD="\[\033[1;31m\]"
    local GREEN="\[\033[0;32m\]"
    local GREENBOLD="\[\033[1;32m\]"
    local YELLOW="\[\033[0;33m\]"
    local YELLOWBOLD="\[\033[1;33m\]"
    local BLUE="\[\033[0;34m\]"
    local BLUEBOLD="\[\033[1;34m\]"
    local PURPLE="\[\033[0;35m\]"
    local PURPLEBOLD="\[\033[1;35m\]"
    local CYAN="\[\033[0;36m\]"
    local CYANBOLD="\[\033[1;36m\]"
    local WHITE="\[\033[0;37m\]"
    local WHITEBOLD="\[\033[1;37m\]"
    local RESET="\[\033[00m\]"

    local LAST_COMMAND_INFO=""
    [[ $LAST_EXIT -ne 0 ]] && local LAST_COMMAND_INFO="$REDBOLD$LAST_EXIT$RESET "
#    [[ $LAST_COMMAND_ELAPSED > -1 ]] && local LAST_COMMAND_INFO="$LAST_COMMAND_INFO$CYAN$(displaytime $LAST_COMMAND_ELAPSED)$RESET "
    [[ -n $LAST_COMMAND_INFO ]] && local LAST_COMMAND_INFO="$LAST_COMMAND_INFO-- "
    local USER_HOST="$BLACKBOLD\u@\h$RESET"
    local WD="$BLUEBOLD\w$RESET"
    local GIT="$GREEN$(__git_ps1 " %s")$RESET"
    local DELIM="$WHITEBOLD λ$RESET "

    PS1="\n$LAST_COMMAND_INFO$USER_HOST:$WD$GIT$DELIM"
}

# git-prompt config
GIT_PS1_SHOWDIRTYSTATE=true
GIT_PS1_SHOWSTASHSTATE=true
GIT_PS1_SHOWUNTRACKEDFILES=true
GIT_PS1_SHOWUPSTREAM=true

# Use PROMPT_COMMAND for updating prompt every command
PROMPT_COMMAND=my_prompt

# called before each command and starts stopwatch
function preexec () {
    export PREEXEC_CMD="$BASH_COMMAND"
    export PREEXEC_TIME=$(date +'%s')
}

# called after each command, stops stopwatch
# and notifies if time elpsed exceeds threshold
function precmd () {
    stop=$(date +'%s')
    start=${PREEXEC_TIME:-$stop}
    let elapsed=$stop-$start
    #max=${PREEXEC_MAX:-1}
    max=-1

    if [ $elapsed -gt $max ]; then
        echo
        echo "took $elapsed"
        echo
    fi
}

# Install preexec hook
#preexec_install
