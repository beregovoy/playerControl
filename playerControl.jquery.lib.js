function onYouTubeIframeAPIReady() {
    $('html').trigger('playerApiReady');
}

(function($) {

    $.fn.playerControl = function() {
        if ($(this).length > 1) {
            $(this).each(function(index) {
                if (typeof $(this).data('playerControl') != 'object') {
                    var videoHost = determineVideoHost($(this).attr('src'));
                    if (videoHost == 'youtube')
                        var player = new controlClass(new YT.Player($(this)[0]), videoHost);
                    else
                        var player = new controlClass($f($(this)[0]), videoHost);
                    $(this).data('playerControl', player);
                } else {
                    return;
                }
            })
        } else {
            if (typeof $(this).data('playerControl') != 'object') {
                var videoHost = determineVideoHost($(this).attr('src'));
                if (videoHost == 'youtube')
                    var player = new controlClass(new YT.Player($(this)[0]), videoHost);
                else
                    var player = new controlClass($f($(this)[0]), videoHost);
                $(this).data('playerControl', player);
                return $(this).data('playerControl');
            } else {
                return $(this).data('playerControl');
            }
        }
    };

    function controlClass(controlPlayer, videoHost) {
        this.originPlayer = controlPlayer;
        this.videoHost = videoHost;
        this.volume = 100; //For vimeo mute/unmute function.

        this.play = function() {
            if (this.videoHost == 'youtube')
                this.originPlayer.playVideo();
            else
                this.originPlayer.api('play');
        };
        this.pause = function() {
            if (this.videoHost == 'youtube')
                this.originPlayer.pauseVideo();
            else
                this.originPlayer.api('pause');
        };
        this.stop = function() {
            if (this.videoHost == 'youtube') {
                this.originPlayer.stopVideo();
                this.originPlayer.seekTo(0);
            } else {
                this.originPlayer.api('pause');
                this.originPlayer.api('seekTo', 0);
                this.originPlayer.api('unload');
            }
        };
        this.setVolume = function(volume) {
            if (this.videoHost == 'youtube')
                this.originPlayer.setVolume(volume);
            else
                this.originPlayer.api('setVolume', volume / 100);
        };
        this.mute = function() {
            if (this.videoHost == 'youtube')
                this.originPlayer.mute();
            else {
                this.volume = this.originPlayer.api('getVolume');
                console.log(this.volume);
                this.originPlayer.api('setVolume', 0);
            }
        };
        this.unMute = function() {
            if (this.videoHost == 'youtube')
                this.originPlayer.unMute();
            else {
                console.log(this.volume);
                this.originPlayer.api('setVolume', this.volume);
            }
        };
        this.getDuration = function() { //have no idea why, but working only on youtube
            if (this.videoHost == 'youtube')
                return this.originPlayer.getDuration();
            else
                return this.originPlayer.api('getDuration');
        };
        this.seekTo = function(seconds) { //have no idea why, but working only on youtube
            if (this.videoHost == 'youtube')
                return this.originPlayer.seekTo(seconds);
            else
                return this.originPlayer.api('seekTo', seconds);
        };
    }

    function determineVideoHost(src) {
        if ((/^https?:\/\/player.vimeo.com/).test(src)) {
            return 'vimeo';
        }
        return 'youtube';
    }

}(jQuery));