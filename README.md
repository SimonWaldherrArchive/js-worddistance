## Usage

```javascript
var extendedTextArea = document.getElementByID('textarea_id');
extendedTextArea.getTextSelection(); //Returns {start: 0, end: 4, text: 'Text'}
extendedTextArea.selectText(3, 1); //Selects the 4th characters
extendedTextArea.insertText('New Text') //Insert 'New Text' into current cursor's position
