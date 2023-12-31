//At its core, D3 is a lib that allows users to draw low-level, highly customisable interactive graphs using JS. It uses SVGs and works by manipulating SVGs using various functions. 

//Selections

//To make selections, use either d3.select() or d3.selectAll(). The former chooses the first one it finds, and the latter selects all. Both functions take a string as their only arguments. 

//Both select and selectAll return an array of HTML nodes.

//Once elements are selected, they can be modified using:
//.style()
//.attr()
// .classed()
// .property()
// .text()
// .html()

//Event Handlers

//Event handlers can be added to selected methods using the .on() method.
//Some common ones:
// .click()
// .mouseenter()
// .mouseover()
// .mouseleave()
// .mouseout()
// .mousemove()

//Inserting and removing elements

//Elements can be added to the document without manually adding SVGs via the d3 append() and insert() method. This is the default way to do so when doing data visualisation. 
//Elements can be removed using .remove().
//Insert is similar to append but it allows us to specify a 2nd argument which specifies (as a CSS selector) which element to insert the new element before. 
//The .each() method lets you call a function for each element of a section. 
//The .call() method allows a function to be called into which the selection itself is passed as the first argument. Each() iterates over each element, and .call() invokes a function once and passes the entire selection to that function.
//Filter() can also be used, in the same way that you would use it for JS.


//Data Joins

//D3 focuses on a data-driven approach. To make D3 aware of the data, the data() metod is used on a selection of DOM elements to attach the data to those elements. The data set is passed as an argument to the method. 

//If you have more data than elements, use enter(). If more elements than data, use exit().

//Styling

//Using a lot of inline styles on HTML elements can be hard to manage, and is often easier to use class elements. Use the attr() method to add any HTML attributes to an element, including a class name. The attr() method works the same way as style does. It takes comma-seperated values, and can use a callback function.

//Style vs attr. Both are methods in d3 that do similar things. I've so far been using attr in my code. Both attr and style change the DOM. You can also use CSS, which doesn't modify the DOM. 

//Displaying shapes with SVGs

//When you place a shape into the SVG area, you specify where it goes with x and y co-ordinates. The origin point is (0,0), and this is the upper left hand corner. 
//Positive values for x push shape to the RIGHT, and positive values for y push the shape DOWN.

// When we initially draw bar charts, it'll be upside-down/inverted. This is because of how SVGs use (x,y) co-ordinates. In SVGs the origin point for the co-ordinates is the upper left hand corner. 