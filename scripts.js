document.addEventListener('DOMContentLoaded', function() {
    const publicUrl = "https://your-ngrok-url";

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            document.getElementById(this.dataset.tab).classList.add('active');
        });
    });

    document.getElementById('summarize-button').addEventListener('click', function() {
        const summary = document.getElementById('history-input').value;
        fetch(publicUrl + '/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ summary: summary })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('summary-result').innerHTML = data.result.replace(/\n/g, '<br>');
        })
        .catch(error => {
            alert('An error occurred: ' + error);
        });
    });

    document.getElementById('treatment-button').addEventListener('click', function() {
        const symptoms = document.getElementById('symptoms-input').value;
        fetch(publicUrl + '/suggest-treatment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symptoms: symptoms })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('treatment-result').innerHTML = data.result.replace(/\n/g, '<br>');
        })
        .catch(error => {
            alert('An error occurred: ' + error);
        });
    });
});
