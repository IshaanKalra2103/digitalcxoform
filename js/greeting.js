fetch('https://digitalcxoapi-2abd74fc33cb.herokuapp.com/db')
.then(response => response.json())
.then(data => {
  // data is an array of categories, each with an array of channels
  data.forEach(category => {
    // Create the outer div
    const outerDiv = document.createElement('div');
    outerDiv.className = 'col-sm-12 col-xl-3';

    // Create the inner div
    const innerDiv = document.createElement('div');
    innerDiv.className = 'py-4';

    // Create the div for h1
    const h1Div = document.createElement('div');
    h1Div.className = 'd-flex justify-content-between';

    // Create the h1 for the category name
    const h1 = document.createElement('h1');
    h1.className = 'display-75';
    h1.textContent = category.category;

    // Append the h1 to the h1Div
    h1Div.appendChild(h1);

    // Create the links div
    const linksDiv = document.createElement('div');
    linksDiv.className = 'links text-start';

    // Create an a element for each channel
    category.channels.forEach(channel => {
      const a = document.createElement('a');
      a.className = 'display-8';
      a.href = channel.link;
      a.target = '_blank';
      a.textContent = channel.name;

      // Add a br element after each a element
      const br = document.createElement('br');

      // Append the a and br elements to the links div
      linksDiv.appendChild(a);
      linksDiv.appendChild(br);
    });

    // Append the h1Div and links div to the inner div
    innerDiv.appendChild(h1Div);
    innerDiv.appendChild(linksDiv);

    // Append the inner div to the outer div
    outerDiv.appendChild(innerDiv);

    // Select the main-content div and append the outer div to it
    const mainContentDiv = document.getElementById('recipe');
    mainContentDiv.appendChild(outerDiv);
  });
})
.catch(error => {
  console.error('Error:', error);
});