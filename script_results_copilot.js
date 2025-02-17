document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1-5', '6-10', '11-15', '16-20', '21-25', '26-30'],
            datasets: [
                {
                    label: 'Hittil denne måneden',
                    data: [1200, 1500, 1800, 2000, 2200, 2500],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false
                },
                // Legg til flere datasets basert på konseptet
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
