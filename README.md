# Q4 UPDATED PROJECT PLAN 

To furthermore improve our project, we have decided to add an account or the ability for users to login. This is both essential for the player's game experience and the game's functionality. This way, the users would be allowed to create their personal accounts, which helps in saving their progress and players can pick up right where they left off.

This would help secure the information or gaming experience of the users. Having this feature allows the users to switch devices yet maintain their work without facing hassles. Overall, this would enhance the game's functionality by being more personalized, safe and secure.

1. 
- Type: user login data (username, password)
- Purpose: logging in to site and saving the progress
- Structure in JSON format:
users {
username : password 
}

2.
- Type: save state for each feature (all doll features, background, dialogue)
- Purpose: saving the last state of each class so that it will not go away when proceeding to the next page.
- Structure in JSON format:
states {
  "face": savedState.face,
  "top": savedState.top,
  "bottom": savedState.bottom,
  "fh": savedState.fh,
  "bh": savedState.bh,
  "shoes": savedState.shoes
}

As for the saved states, they are currently already visible on the actual website. The users may change the state of the feature in page 2, and it will carry on to page 3. Unfortunately, this is still a work in progress so it is not guaranteed to always function properly.

<img src="https://cdn.glitch.global/3b0c555a-66e1-432a-baca-4bf522e55a01/USERNAME.png?v=1742975696227">
<img src="https://cdn.glitch.global/3b0c555a-66e1-432a-baca-4bf522e55a01/YE.png?v=1742977797069">
~~

# CS Project Proposal

## Rb15 Hutalla, Rb23 Puga

### Website title: Dress the Best

### Description:

The website will be a dress-up game in which users can create their own characters by clicking on buttons. It includes a homepage in which users can input their name, the main dress up page which allows the user to go through a selection of features and use any of their choice for the character, and finally a "picture" page that will display the finished character and a dialogue options with the user's name, so they could screenshot it and use it for any purpose they wish (profile picture, background picture, profile banner, etc)

### Website outline:

#### 1. Homepage

- It contains 2 buttons in order to redirect the user to the 2 separate web pages.
- Contains input box and button to input and save the user's desired name.

#### 2. Webpage 1 / Dress Up

- This is where the user can customize their characters with a few different options.
- Contains buttons for some parts of the character (Face, Back Hair, Front hair, Top, Bottom, Shoes)

#### 3. Webpage 2 / Dialogue

- This will display the created character, along with a dialogue box that will feature some dialogues using the user inputted name.
- Contains buttons for different dialogue options including the name. ("Hello #name", "Hello I am #name", "My name is #name", and custom input too)
- Contains buttons to change the inputted name, and another button to change backgrounds

### JS Incorporation

Sample of the dress up game part (not final, this is just to test if I can actually do it):
<https://glitch.com/edit/#!/dresstest>>
- Save and display user's input in different texts (name): document.getElementById
, extra lines to prevent them from typing inappropriate words
- For buttons and their response: different functions for each button

- For the custom input option: Input boxes, extra lines to prevent user from typing inappropriate words
- For changing the elements in the dress up game itself: document.querySelector, setAttribute, if else statements

In general, the entire website can be built with topics already discussed in class in the previous quarters. The only new thing that has not yet been discussed is the document.querySelector that will retrieve the id of the divs, and setAttribute function to change it's class to the class of the current element.

### Wireframe 

<img src="https://cdn.glitch.global/3b0c555a-66e1-432a-baca-4bf522e55a01/e65f8e56-54ce-49e1-969a-c3c76b1aa1b8.image.png?v=1731936781302">
<img src="https://cdn.glitch.global/3b0c555a-66e1-432a-baca-4bf522e55a01/551e04bb-7640-485b-845a-63e2fe549e4a.image.png?v=1731937111905">
<img src="https://cdn.glitch.global/3b0c555a-66e1-432a-baca-4bf522e55a01/900cf1da-81b1-44d0-b6d7-f5493905934a.image.png?v=1731937161229">
