function sendData() {
    var XHR = new XMLHttpRequest();
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;


    if (name === '') {
        alert("Name must be filled.");
        return;
    }
    if (email === '') {
        alert("Email must be filled.");
        return;
    }
    if (subject === '') {
        alert("Subject must be filled.");
        return;
    }
    if (message === '') {
        alert("Message must be filled.");
        return;
    }

    if (validateEmail(email)) {
        // Transformez l'objet data en un tableau de paires clé/valeur codées URL.

        urlEncodedDataPairs.push(encodeURIComponent(name));
        urlEncodedDataPairs.push(encodeURIComponent(email));
        urlEncodedDataPairs.push(encodeURIComponent(subject));
        urlEncodedDataPairs.push(encodeURIComponent(message));

        // Combinez les paires en une seule chaîne de caractères et remplacez tous
        // les espaces codés en % par le caractère'+' ; cela correspond au comportement
        // des soumissions de formulaires de navigateur.
        urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

        // Définissez ce qui se passe en cas de succès de soumission de données
        XHR.addEventListener('load', function(event) {
            alert('Ouais ! Données envoyées et réponse chargée.');
        });

        // Définissez ce qui arrive en cas d'erreur
        XHR.addEventListener('error', function(event) {
            alert('Oups! Quelque chose s\'est mal passé.');
        });

        // Configurez la requête
        XHR.open('POST', 'adressToReceiveDatas');

        // Ajoutez l'en-tête HTTP requise pour requêtes POST de données de formulaire
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // Finalement, envoyez les données.
        XHR.send(urlEncodedData);
    } else {
        alert('Email should look like xxxx@xxx.xx');
        return;
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
