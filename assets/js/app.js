(function($) {
    // Non-DOM-ready-required code here (scope-safe)
    $(function() {
        const giphy = {
            topics_array: ["FULL METAL ALCHEMIST", "ATTACK ON TITAN", "DRAGON BALL", "BLEACH"],
            init() {
                this.dom_cache();
                this.event_binding();
                this.topics_btns();
            },
            dom_cache() {
                this.$btns_container = $('#btns-topics');
                this.$list = $('#list');
                this.$input = $('input');
                this.$add_anime_btn = $('#add-anime');
                this.$msg = $('#msg');
            }, 
            event_binding() {
                this.$btns_container.on('click', 'button.topics', this.get_gifs.bind(this));    // Event listener for clicks on the buttons with the topics
                this.$list.on('click', '.topic-img', this.gify.bind(this));     // Event listener for clicks on the static/animated imgs
                this.$add_anime_btn.on('click', this.create_btn.bind(this));   // Event listener for clicks on the "add anime" button to create new buttons with topics
            }, 
            topics_btns() { // Create and populate buttons for the topics_array
                this.$btns_container.html('');   // Make sure the container is empty
                for(let i = 0; i < this.topics_array.length; i++){
                    let btn = $(`<button class="topics" data-name="${this.topics_array[i]}">${this.topics_array[i]}</button>`); // Create a button for every topic in the array and passed the value/text to the data-name attr
                    this.$btns_container.append(btn);   // Show the buttons in the page
                }
            },
            get_gifs(e){
                const topic = $(e.target).attr('data-name');    // Get the data-name attr from the clicked button
                const k = "lFF9Yxkitf2ugL6Waes2cFHNZ8UE1h5i";    // API Key
                const l = "10";  // Limit of results
                const reqURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=${k}&limit=${l}`;
                
                $.ajax({    // Initialize AJAX request to GIPHY API
                    url: reqURL,
                    request: 'GET'
                }).done( res => {
                    console.log(res);   // To visualize the entire response object from GIPHY
                    this.$list.html('');    // Empty the container before displaying requested items
                    
                    for(let j = 0; j < res.data.length; j++) {  // Loop through the response to find the required info
                        let rating = `${res.data[j].rating.toUpperCase()}`;   // Get the rating for the current iteration
                        let img_src = `${res.data[j].images["480w_still"].url}`;    // Get the url for the static images of the current iteration
                        let gif_src = `${res.data[j].images.downsized.url}`;    // Get the url for the animated gif of the current iteration
                        
                        const rating_p = $(`<p class="topic-p"><strong>Rating:</strong> ${rating}</p>`)  //Create a <p> to hold the rating
                        // Create <img> and pass the URL for the static img and the animated gif as data-attr. I will use them later to change the src on click
                        const static_img = $(`<img class="topic-img" src="${img_src}" data-status="static" data-img="${img_src}" data-gif="${gif_src}">`);   
                        const item_container = $(`<div class="item-container">`);   // Create a <div> to hold each <img> and <p>
                        
                        item_container.append(rating_p, static_img);    // Append the <img> and <p> to the container
                        this.$list.append(item_container);  // Attach the container to the page
                    }
                });
            },
            gify(e){    // Changing the img from static to animated and back
                const $target = $(e.target);
                const $gif_src = $target.attr('data-gif');   // Get the URL for the animated GIF
                const $img_src = $target.attr('data-img');   // Get the URL for the static img
                const $status = $target.attr('data-status'); // Get the status animated or static
              
                if($status === 'static') {
                    $target.attr('data-status', 'animated');
                    $target.attr('src', $gif_src);
                    console.log($target);
                } 
                else {
                    $target.attr('data-status', 'static');
                    $target.attr('src', $img_src);
                }
            },
            create_btn(){
                const new_topic = this.$input.val().toUpperCase();  // Get the user input and change it to upper case letters
                const already_in_arr = this.topics_array.indexOf(new_topic);    // Get the indexOf to see if the item already exists in the array

                if (already_in_arr < 0){    // Check if the button doesn't exist already
                    this.topics_array.push(new_topic);  // If it doesn't, push the new input to the array
                    this.$input.val('');    // Clear the input
                    this.topics_btns(); // Render the buttons including the new button
                }
                else {  // If the item alreay exists in the array
                    this.$msg.html(`You already created <i>${new_topic}</i>!`);     // Inform the user  
                    setTimeout(this.clear_msg.bind(this), 3000);    // Clear the message after 3 secs
                }
            },
            clear_msg() {
                this.$msg.html('');
            }
        }
        giphy.init();
    });
    
})(jQuery); 