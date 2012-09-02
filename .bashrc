#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

#PS1='[\u@\h \W]\$ '
#PS1='┌─[\w]\n└──┤ '
PS1='┌─┤ \w │\n└──╢ '


####ENVIRONMENT VARIABLES####
export DE=xfce
export EDITOR=leafpad
export GRAPHICS_EDITOR=gimp

####pacman####
alias pacman='sudo pacman-color'
alias pkgupdate='sudo pacman-color -Syyuu'
alias pkginstall='sudo pacman-color -S'
alias pkgsearch='sudo pacman-color -Ss'
alias pkgquery='sudo pacman-color -Q'
alias pkguninstall='sudo pacman-color -Rnds'
alias pkgclean='sudo pacman-color -Scc'
alias aurupdate='packer -Syu --auronly'
alias aurinstall='packer -S --auronly'
alias aursearch='packer -Ss --auronly'
alias aurquery='sudo pacman-color -Qm'
alias sysupdate='sudo pacman-color -Syyuu && packer -Syu --auronly --noedit'
alias pkglist='pacman -Qq > /home/zach/pkglist && mv /home/zach/pkglist /home/zach/Dropbox/archlinux-stuff/package-lists/regular'

####POWER####
alias reboot='bash /home/zach/scripts/reboot'
alias poweroff='bash /home/zach/scripts/shutdown'
alias sleep='bash /home/zach/scripts/sleep'

####SYSTEM CONFIGURATION####
alias powertop='sudo powertop'
alias rcbash='$EDITOR ~/.bashrc'
alias systemctl='sudo systemctl'
alias journalctl='sudo journalctl'
alias keycheck="xev | grep -A2 --line-buffered '^KeyRelease' | sed -n '/keycode /s/^.*keycode \([0-9]*\).* (.*, \(.*\)).*$/\1 \2/p'"

####NAVIGATION/MANAGEMENT####
alias mkdir='mkdir -p'
alias ..='cd ..'
alias ...='cd ../..'
alias cp='cp -r'
alias rm='rm -rf'
alias cronedit='EDITOR=nano crontab -e'
alias compress='tar -cJf'
alias ls='ls -a --color=auto --group-directories-first'
alias edit='$EDITOR'
alias sedit='sudo $EDITOR'
alias gredit='$GRAPHICS_EDITOR'
alias sgredit='sudo $GRAPHICS_EDITOR'

####SSH####
alias sshterm='ssh -i /home/zach/.ssh/id_rsa -l zach capital'
alias sshmount='bash /home/zach/scripts/sshfs_connect'

####SCRIPTS####
alias lock='bash /home/zach/scripts/lock'
alias random-background='bash /home/zach/scripts/random-background'
alias thumbnail='bash /home/zach/scripts/thumbnail'
alias clean-names='bash /home/zach/scripts/clean-names'
alias simple-desktops='bash /home/zach/scripts/simple-desktops /home/zach/.wallpapers/simple-desktop 1-40 update'

####SYSTEMD STUFF####
start() {
  sudo systemctl start $1.service
}

restart() {
  sudo systemctl restart $1.service
}

stop() {
  sudo systemctl stop $1.service
}

enable() {
  sudo systemctl enable $1.service
}

status() {
  sudo systemctl status $1.service
}

disable() {
  sudo systemctl disable $1.service
}

#man() {
#  man $1 | less
#}
