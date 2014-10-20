(function (document, window) {
    var progress = new Progress(document.querySelector('.target'), {
        size: 200,
        stroke_width: 8
    }), value = 30;

    // Start with 30
    progress.set(value);

    // Add eventListeners to the buttons
    var increaseButton = document.querySelector('.increase-button'),
        decreaseButton = document.querySelector('.decrease-button'),
        setButton = document.querySelector('.set-button'),
        valueInput = document.querySelector('.value-input');

    // Increase with 5
    increaseButton.addEventListener('click', function () {
        value += 5;
        if (value > 100){
            value = 100;
        }
        progress.set(value);
        refresh();
    });

    // Increase with 5
    decreaseButton.addEventListener('click', function () {
        value -= 5;
        if (value < 0) {
            value = 0;
        }
        progress.set(value);
        refresh();
    });

    // Manually set the value of the indicator
    setButton.addEventListener('click', function () {
        value = parseInt(valueInput.value);

        // Check if the value is correct
        if (value < 0 || value > 100) {
            alert('Value must be between 0 and 100.');
            return;
        }

        progress.set(value);
        refresh();
    });

    /**
     * Refreshes the input box with the current percentage
     */
    function refresh() {
        valueInput.value = value;
    }
})(document, window);
