#!/bin/sh
#
# ~/.xinitrc
#
# Executed by startx (run your window manager from here)

 if test -z "$DBUS_SESSION_BUS_ADDRESS" ; then
    # if not found, launch a new one
    eval `dbus-launch --sh-syntax --exit-with-session`
    echo "D-Bus per-session daemon address is: $DBUS_SESSION_BUS_ADDRESS"
 fi


if [ -d /etc/X11/xinit/xinitrc.d ]; then
  for f in /etc/X11/xinit/xinitrc.d/*; do
    [ -x "$f" ] && . "$f"
  done
  unset f
fi

export EDITOR=leafpad &
export DE=xfce &


# exec gnome-session
# exec startkde
# exec startxfce4
# ...or the Window Manager of your choice
/usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1  &
/usr/bin/gnome-keyring-daemon --start --components=gpg &
/usr/bin/gnome-keyring-daemon --start --components=pkcs11 &
/usr/bin/gnome-keyring-daemon --start --components=secrets &
/usr/bin/gnome-keyring-daemon --start --components=ssh &

exec dbus-launch openbox-session
