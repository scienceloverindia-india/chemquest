export interface Formula {
  name: string;
  latex: string;
  description: string;
  unit: string;
  examImportance: 'high' | 'medium' | 'low';
}

export const FORMULAS: Record<string, Formula[]> = {
  ch5001: [
    { name: 'Arrhenius Equation', latex: 'k = A e^{-\\frac{E_a}{RT}}', description: 'Temperature dependence of reaction rate constant.', unit: 'Kinetics', examImportance: 'high' },
    { name: 'Power Law Model', latex: '-r_A = k C_A^n', description: 'Empirical rate law for an irreversible n-th order reaction.', unit: 'Kinetics', examImportance: 'high' },
    { name: 'Zero Order Half-life', latex: 't_{1/2} = \\frac{C_{A0}}{2k}', description: 'Time required to reduce reactant concentration by half for zero order.', unit: 'Batch Reactor Data', examImportance: 'medium' },
    { name: 'First Order Half-life', latex: 't_{1/2} = \\frac{\\ln 2}{k}', description: 'Time required to reduce reactant concentration by half for first order.', unit: 'Batch Reactor Data', examImportance: 'high' },
    { name: 'CSTR Design Equation', latex: 'V = \\frac{F_{A0} X_A}{-r_A}', description: 'Volume of a Continuous Stirred Tank Reactor.', unit: 'Ideal Reactors', examImportance: 'high' },
    { name: 'PFR Design Equation', latex: 'V = F_{A0} \\int_0^{X_A} \\frac{dX_A}{-r_A}', description: 'Volume of a Plug Flow Reactor.', unit: 'Ideal Reactors', examImportance: 'high' },
    { name: 'Space Time', latex: '\\tau = \\frac{V}{v_0}', description: 'Time required to process one reactor volume of fluid.', unit: 'Ideal Reactors', examImportance: 'high' },
    { name: 'Fractional Conversion', latex: 'X_A = \\frac{N_{A0} - N_A}{N_{A0}}', description: 'Fraction of reactant converted to products.', unit: 'Kinetics', examImportance: 'high' },
    { name: 'Thiele Modulus', latex: '\\phi_n = L \\sqrt{\\frac{k C_A^{n-1}}{D_e}}', description: 'Ratio of intrinsic reaction rate to diffusion rate in porous catalyst.', unit: 'Heterogeneous Catalysis', examImportance: 'medium' },
    { name: 'Ergun Equation', latex: '\\frac{\\Delta P}{L} = \\frac{150 \\mu v}{D_p^2} \\frac{(1-\\epsilon)^2}{\\epsilon^3} + \\frac{1.75 \\rho v^2}{D_p} \\frac{1-\\epsilon}{\\epsilon^3}', description: 'Pressure drop in packed beds.', unit: 'Heterogeneous Catalysis', examImportance: 'medium' }
  ],
  ch5002: [
    { name: 'Relative Volatility', latex: '\\alpha_{AB} = \\frac{y_A / x_A}{y_B / x_B}', description: 'Measure of the differences in volatility between two components.', unit: 'Distillation Fundamentals', examImportance: 'high' },
    { name: 'Rayleigh Equation', latex: '\\ln \\frac{W}{W_0} = \\int_{x_{F}}^{x_W} \\frac{dx}{y^* - x}', description: 'Equation for simple batch (differential) distillation.', unit: 'Distillation Fundamentals', examImportance: 'high' },
    { name: 'Rectifying Operating Line', latex: 'y_{n+1} = \\frac{R}{R+1}x_n + \\frac{x_D}{R+1}', description: 'Operating line for the rectifying section.', unit: 'Continuous Distillation', examImportance: 'high' },
    { name: 'Stripping Operating Line', latex: 'y_{m+1} = \\frac{\\bar{L}}{\\bar{V}}x_m - \\frac{B}{\\bar{V}}x_B', description: 'Operating line for the stripping section.', unit: 'Continuous Distillation', examImportance: 'high' },
    { name: 'q-line Equation', latex: 'y = \\frac{q}{q-1}x - \\frac{z_F}{q-1}', description: 'Feed line equation representing thermal condition of feed.', unit: 'Continuous Distillation', examImportance: 'high' },
    { name: 'Minimum Reflux Ratio', latex: 'R_{min} = \\frac{x_D - y_F^*}{y_F^* - x_F^*}', description: 'Minimum reflux ratio for given separation.', unit: 'Continuous Distillation', examImportance: 'medium' },
    { name: 'Freundlich Isotherm', latex: 'q_e = K_f C_e^{1/n}', description: 'Empirical model for adsorption onto heterogeneous surfaces.', unit: 'Adsorption', examImportance: 'high' },
    { name: 'Langmuir Isotherm', latex: 'q_e = \\frac{q_m K_L C_e}{1 + K_L C_e}', description: 'Adsorption model assuming monolayer coverage on homogeneous surface.', unit: 'Adsorption', examImportance: 'high' }
  ],
  ch5003: [
    { name: 'First Order Transfer Function', latex: 'G(s) = \\frac{K_p}{\\tau s + 1}', description: 'Transfer function of a standard first order system.', unit: 'First Order Systems', examImportance: 'high' },
    { name: 'Time Constant', latex: '\\tau', description: 'Time required for system response to reach 63.2% of final value.', unit: 'First Order Systems', examImportance: 'high' },
    { name: 'Second Order Transfer Function', latex: 'G(s) = \\frac{K}{\\tau^2 s^2 + 2\\zeta\\tau s + 1}', description: 'Transfer function of a standard second order system.', unit: 'Second Order Systems', examImportance: 'high' },
    { name: 'PID Controller Transfer Function', latex: 'G_c(s) = K_c \\left( 1 + \\frac{1}{\\tau_I s} + \\tau_D s \\right)', description: 'Transfer function of a Proportional-Integral-Derivative controller.', unit: 'Controllers', examImportance: 'high' },
    { name: 'Closed Loop Transfer Function (Servo)', latex: '\\frac{Y(s)}{Y_{sp}(s)} = \\frac{G_c G_p}{1 + G_c G_p G_m}', description: 'Response to setpoint changes.', unit: 'Closed Loop Systems', examImportance: 'high' },
    { name: 'Closed Loop Transfer Function (Regulator)', latex: '\\frac{Y(s)}{D(s)} = \\frac{G_d}{1 + G_c G_p G_m}', description: 'Response to load (disturbance) changes.', unit: 'Closed Loop Systems', examImportance: 'high' },
    { name: 'Decay Ratio', latex: 'DR = e^{-\\frac{2\\pi\\zeta}{\\sqrt{1-\\zeta^2}}}', description: 'Ratio of heights of successive peaks in underdamped response.', unit: 'Second Order Systems', examImportance: 'medium' },
    { name: 'Offset', latex: 'Offset = Y_{sp}(\\infty) - Y(\\infty)', description: 'Steady state error in proportional control.', unit: 'Closed Loop Systems', examImportance: 'medium' }
  ],
  ch50042: [
    { name: 'Dulong Formula', latex: 'GCV = \\frac{1}{100} \\left[ 8080 C + 34500 \\left( H - \\frac{O}{8} \\right) + 2240 S \\right]', description: 'Gross Calorific Value of solid fuels (kcal/kg).', unit: 'Solid Fuels', examImportance: 'high' },
    { name: 'Net Calorific Value', latex: 'NCV = GCV - 9H \\times 587', description: 'Net Calorific Value accounting for water vaporization.', unit: 'Solid Fuels', examImportance: 'high' },
    { name: 'Air-Fuel Ratio (Mass)', latex: 'AFR_m = \\frac{m_{air}}{m_{fuel}}', description: 'Mass ratio of air to fuel in combustion.', unit: 'Combustion Calculations', examImportance: 'high' },
    { name: 'Theoretical Oxygen for Carbon', latex: 'C + O_2 \\rightarrow CO_2', description: 'Stoichiometric combustion of Carbon.', unit: 'Combustion Calculations', examImportance: 'medium' },
    { name: 'Theoretical Oxygen for Hydrogen', latex: 'H_2 + 0.5 O_2 \\rightarrow H_2O', description: 'Stoichiometric combustion of Hydrogen.', unit: 'Combustion Calculations', examImportance: 'medium' },
    { name: 'Excess Air Percentage', latex: '\\% EA = \\frac{\\text{Actual Air} - \\text{Theoretical Air}}{\\text{Theoretical Air}} \\times 100', description: 'Percentage of air supplied above stoichiometric requirements.', unit: 'Combustion Calculations', examImportance: 'high' },
    { name: 'Viscosity Index', latex: 'VI = \\frac{L - U}{L - H} \\times 100', description: 'Measure of change in viscosity with temperature.', unit: 'Liquid Fuels', examImportance: 'medium' },
    { name: 'API Gravity', latex: '^\\circ API = \\frac{141.5}{SG} - 131.5', description: 'Measure of how heavy or light a petroleum liquid is.', unit: 'Liquid Fuels', examImportance: 'high' }
  ],
  ch50052: [
    { name: 'Threshold Limit Value (TWA)', latex: 'TWA = \\frac{\\sum C_i T_i}{\\sum T_i}', description: 'Time-Weighted Average concentration for 8-hour workday.', unit: 'Toxicology', examImportance: 'high' },
    { name: 'Mixture TLV', latex: 'TLV_{mix} = \\frac{1}{\\sum \\frac{x_i}{TLV_i}}', description: 'TLV for a mixture of multiple toxic components.', unit: 'Toxicology', examImportance: 'high' },
    { name: 'Lower Flammability Limit of Mixture', latex: 'LFL_{mix} = \\frac{1}{\\sum \\frac{y_i}{LFL_i}}', description: 'Le Chatelier rule for LFL of mixtures.', unit: 'Fires & Explosions', examImportance: 'high' },
    { name: 'Upper Flammability Limit of Mixture', latex: 'UFL_{mix} = \\frac{1}{\\sum \\frac{y_i}{UFL_i}}', description: 'Le Chatelier rule for UFL of mixtures.', unit: 'Fires & Explosions', examImportance: 'high' },
    { name: 'Vapor Pressure (Antoine Eq)', latex: '\\log_{10} P = A - \\frac{B}{T + C}', description: 'Vapor pressure as a function of temperature.', unit: 'Toxicology', examImportance: 'medium' },
    { name: 'Overpressure', latex: 'P_s = P_{peak} - P_{ambient}', description: 'Peak pressure above ambient from an explosion.', unit: 'Fires & Explosions', examImportance: 'medium' },
    { name: 'Risk', latex: 'Risk = \\text{Probability} \\times \\text{Consequence}', description: 'Fundamental definition of risk.', unit: 'Risk Assessment', examImportance: 'high' },
    { name: 'Fatal Accident Rate', latex: 'FAR = \\frac{\\text{Number of fatalities} \\times 10^8}{\\text{Total hours worked}}', description: 'Number of fatalities per 10^8 man-hours.', unit: 'Introduction to Safety', examImportance: 'high' }
  ],
  ch51001: [
    { name: 'Gross Domestic Product', latex: 'GDP = C + I + G + (X - M)', description: 'Total value of goods produced and services provided.', unit: 'Basic Features', examImportance: 'high' },
    { name: 'Net Domestic Product', latex: 'NDP = GDP - \\text{Depreciation}', description: 'GDP minus depreciation on a country\'s capital goods.', unit: 'Basic Features', examImportance: 'medium' },
    { name: 'Gross National Product', latex: 'GNP = GDP + \\text{Net factor income from abroad}', description: 'Total value of all finished goods and services produced by a country\'s citizens.', unit: 'Basic Features', examImportance: 'high' },
    { name: 'Per Capita Income', latex: 'PCI = \\frac{\\text{National Income}}{\\text{Total Population}}', description: 'Average income earned per person in a given area.', unit: 'Basic Features', examImportance: 'high' },
    { name: 'Balance of Trade', latex: 'BoT = \\text{Value of Exports} - \\text{Value of Imports}', description: 'Difference in value between a country\'s imports and exports.', unit: 'Foreign Trade', examImportance: 'high' },
    { name: 'Inflation Rate', latex: '\\text{Inflation} = \\frac{CPI_{t} - CPI_{t-1}}{CPI_{t-1}} \\times 100', description: 'Rate of increase in prices over a given period of time.', unit: 'Basic Features', examImportance: 'medium' },
    { name: 'Debt to GDP Ratio', latex: '\\text{Ratio} = \\frac{\\text{Total Debt}}{GDP}', description: 'Ratio of a country\'s public debt to its gross domestic product.', unit: 'Basic Features', examImportance: 'low' },
    { name: 'FDI Percentage', latex: '\\% FDI = \\frac{\\text{FDI Inflow}}{\\text{Total Investment}} \\times 100', description: 'Foreign Direct Investment as a percentage of total investment.', unit: 'Foreign Trade', examImportance: 'medium' }
  ]
};
