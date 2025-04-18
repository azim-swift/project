$(function () {

    // CONFIG
    let visibilityIds = ['#target']; //must be an array, could have only one element
    let splittingClass = '.splitting';

    // END CONFIG

    //init if it becomes visible by scrolling
    $(window).on('scroll', function () {
        getVisibilityStatus();
    });

    //init if it's visible by page loading
    getVisibilityStatus();

    function getVisibilityStatus() {
        elValFromTop = [];
        var windowHeight = $(window).height(),
            windowScrollValFromTop = $(this).scrollTop();

        visibilityIds.forEach(function (item, index) { //Call each class
            try { //avoid error if class not exist
                elValFromTop[index] = Math.ceil($(item).offset().top);
            } catch (err) {
                return;
            }
            // if the sum of the window height and scroll distance from the top is greater than the target element's distance from the top, 
            //it should be in view and the event should fire, otherwise reverse any previously applied methods
            if ((windowHeight + windowScrollValFromTop) > elValFromTop[index]) {
                counter_init(item);
            }
        });
    }

    function splitting_init(groupId) {
        let num, speed, direction, index = 0;
        $(splittingClass).each(function () {
            num = $(this).attr('data-TargetNum');
            speed = $(this).attr('data-Speed');
            direction = $(this).attr('data-Direction');
            easing = $(this).attr('data-Easing');
            if (speed == undefined) speed = defaultSpeed;
            $(this).addClass('c_' + index); //add a class to recognize each counter
            doSplite(num, index, speed, groupId, direction, easing);
            index++;
        });
    }

    function doSplite(num, index, speed, groupClass, direction, easing) {
        let className = groupClass + ' ' + splittingClass + '.' + 'c_' + index;
        if(easing == undefined) easing = "swing";
        $(className).animate({
            chars
        }, {
            duration: +speed,
            easing: easing,
            step: function (now) {
                if (direction == 'reverse') {
                    $(this).text(chars - Math.floor(now));
                } else {
                    $(this).text(Math.floor(now));
                }
            },
            complete: doSplite
        });
    }
})