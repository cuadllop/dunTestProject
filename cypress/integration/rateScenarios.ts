const apiEndpoint = Cypress.env('rateEndPoint');

var scenarios = [];
var latestDateScenario = {};
latestDateScenario.date = 'latest';
latestDateScenario.name = 'Latest';
latestDateScenario.base = 'EUR';
latestDateScenario.symbols = ['JPY'];

scenarios[0] = latestDateScenario;

var specificDateScenario = {};
specificDateScenario.date = '2020-01-01';
specificDateScenario.name = 'Specific';
specificDateScenario.base = 'USD';
specificDateScenario.symbols = ['GBP'];

scenarios[1] = specificDateScenario;

context(`Rate scenarios`, () => {

    for (let i = 0, len = scenarios.length; i < len; i++) {
        describe(`.${scenarios[i].name} date Foreign Exchange rates`, () => {

            it(`get latest Foreign Exchange rates of ${scenarios[i].name} date with base`, () => {
                var date = 'latest';

                cy.request({
                    url: `${apiEndpoint}${scenarios[i].date}`,
                    qs: {
                        base: scenarios[i].base
                    },
                })
                    .then((response) => {
                        expect(response.body.base).equal(scenarios[i].base);
                        expect(response.body.rates.GBP).above(0);
                    });
            });

            it(`get latest Foreign Exchange rates of ${scenarios[i].name} date with symbols`, () => {

                cy.request('GET', `${apiEndpoint}${scenarios[i].date}?symbols=${scenarios[i].symbols}`)
                    .then((response) => {

                        for (let j = 0, len = scenarios[i].symbols.length; j < len; j++) {
                            expect(response.body.rates).property(scenarios[i].symbols[j]).above(0);
                        }
                    });
            });

            it(`get latest Foreign Exchange rates of ${scenarios[i].name} date with base symbols`, () => {

                cy.request('GET', `${apiEndpoint}${scenarios[i].date}?symbols=${scenarios[i].symbols}&base=${scenarios[i].base}`)
                    .then((response) => {
                        for (let j = 0, len = scenarios[i].symbols.length; j < len; j++) {
                            expect(response.body.rates).property(scenarios[i].symbols[j]).above(0);
                        }

                        expect(response.body.base).equal(scenarios[i].base);
                    });
            });
        });

    }

});
