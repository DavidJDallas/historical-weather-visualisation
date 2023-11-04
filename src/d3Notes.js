//At its core, D3 is a lib that allows users to draw low-level, highly customisable interactive graphs using JS. It uses SVGs and works by manipulating SVGs using various functions. 

//Selections

//To make selections, use either d3.select() or d3.selectAll(). The former chooses the first one it finds, and the latter selects all. Both functions take a string as their only arguments. 

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