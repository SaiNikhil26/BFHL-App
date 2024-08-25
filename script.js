document.getElementById('jsonForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const responseContainer = document.getElementById('responseContainer');
    const responseOptions = document.getElementById('responseOptions').value;

    errorElement.textContent = '';
    responseContainer.innerHTML = '';

    // Validate the JSON input
    let parsedJson;
    try {
        parsedJson = JSON.parse(jsonInput);
        console.log(parsedJson)
    } catch (e) {
        errorElement.textContent = 'Invalid JSON format';
        return;
    }

    // Make the API call
    try {
        const res = await fetch('https://bfhl-back-end.onrender.com/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedJson),
        });
        const data = await res.json();

        let filteredData;
        switch (responseOptions) {
            case 'alphabets':
                filteredData = data.alphabets;
                break;
            case 'numbers':
                filteredData = data.numbers;
                break;
            case 'highestLowercase':
                filteredData = data.highestLowercaseAlphabet;;
                break;
            default:
                filteredData = data;
        }

        responseContainer.innerHTML = `<h3>Response:</h3><pre class="response">${JSON.stringify(filteredData, null, 2)}</pre>`;
    } catch (error) {
        errorElement.textContent = 'Error connecting to API';
    }
});
