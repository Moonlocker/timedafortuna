function calculate() {
    var initialAmount = parseFloat(document.getElementById('initialAmount').value);
    var annualPercentage = parseFloat(document.getElementById('annualPercentage').value);
    var years = parseInt(document.getElementById('years').value);
    var monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);

    var investmentData = [];
    var interestData = [];
    var totalInvestment = initialAmount; // Inicializa o total investido com o patrimônio inicial
    var totalInterest = 0;
    var totalAmount = initialAmount;

    for (var year = 1; year <= years; year++) {
        var annualInterest = 0;
        for (var month = 1; month <= 12; month++) {
            var monthlyInterestRate = (1 + (annualPercentage / 100)) ** (1 / 12) - 1; // Taxa de juros mensal
            var monthlyInterest = totalAmount * monthlyInterestRate; // Calcula o rendimento mensal
            totalAmount += monthlyInterest + monthlyContribution; // Atualiza o montante total

            annualInterest += monthlyInterest;
        }
        totalInterest += annualInterest;
        totalInvestment += monthlyContribution * 12; // Adiciona os aportes mensais ao total investido
        investmentData.push(totalInvestment);
        interestData.push(totalInterest);
    }

    var profit = totalInterest + totalInvestment;

    document.getElementById('result').innerHTML = "Após " + years + " anos, seu patrimônio será de R$" + profit.toFixed(2) + ". Total Investido: R$" + totalInvestment.toFixed(2) + ". Total de Rendimento: R$" + totalInterest.toFixed(2);

    createChart(investmentData, interestData, years);
}





function createChart(investmentData, interestData, years) {
    var ctx = document.getElementById('investmentChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: generateLabels(years),
            datasets: [
                {
                    label: 'Total Investido',
                    data: investmentData,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderWidth: 0
                },
                {
                    label: 'Total de Rendimento',
                    data: interestData,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth: 0
                }
            ]
        },
        options: {
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    suggestedMin: 0
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            var label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += 'R$' + context.parsed.y.toFixed(2);
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function generateLabels(years) {
    var labels = [];
    for (var i = 1; i <= years; i++) {
        labels.push('Ano ' + i);
    }
    return labels;
}
