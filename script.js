document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('myChart').getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(255, 193, 7, 0.8)');   // Top color: Light Orange
    gradient.addColorStop(1, 'rgba(255, 235, 59, 0.1)');  // Bottom color: Lighter Orange

    const data = {
        labels: ['Mai 2024', '', '', '', '', ''], // Example labels - adjust as needed
        datasets: [{
            label: 'Omsetning',
            data: [50, 60, 45, 70, 55, 65], // Example data - replace with your data
            fill: true,
            backgroundColor: gradient,
            borderColor: '#ffc107', // Orange border color
            borderWidth: 2,
            tension: 0.4, // Adjust for curve
            pointRadius: 0, // Hide points
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)', // Very light gray grid lines
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return value + 'M'; // Add 'M' for Millions (adjust if needed)
                        }
                    }
                },
                x: {
                    grid: {
                        display: false // No vertical grid lines
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Hide legend
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                },
            }
        },
    };

    const myChart = new Chart(ctx, config);
});