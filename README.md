v0.1

# playerControl
Lib for control embeed iframe players with vimeo or youtube video.


# Require
Youtube and Vimeo api. And jQuery of course

```
<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="https://www.youtube.com/iframe_api"></script>
<script src="https://f.vimeocdn.com/js/froogaloop2.min.js"></script>
```

# Installaion

```
<script src="script.lib.js"></script>
```

# Using
First of first you should initialize plugin. For example we have embeed videos with class .video. So we should do 

```
$(document).on('playerApiReady', function(){
	$('.video').playerControl();		
});
```

# Documentation
There is few functions for now.

play()
```
$('#video).playerControl.play()
```

pause()
```
$('#video).playerControl.pause()
```

stop()
```
$('#video).playerControl.stop()
```

mute()
```
$('#video).playerControl.mute()
```

unMute()
```
$('#video).playerControl.unMute()
```

getDuration() // Works only on youtube somehow. Should be fixed next time.
```
$('#video).playerControl.getDuration()
```

seekTo(integer) // Integer - is seconds for seek.
```
$('#video).playerControl.seekTo(15)
```

setVolume(integer) // Integer - is percents of Volume
```
$('#video).playerControl.setVolume(100)
```