export const quiz = {
  //qtype: "mc-quest" | "float-num-quest" | "one-line-text-quest" | "manylines-text-quest" | "graphing-quest";
  questions: [
    {
      qtype: "graphing-quest",
      question:
        "Using the pencil drawing tool, sketch what the graph looks like. (Sketch means that you don't need to label the axes or numbers, just the shape of the graph.)",
      Ref: [
        "url_link",
        "https://fred.stlouisfed.org/series/CPIAUCSL",
        "Click the following link to view CPI data from FRED, which opens in a new tab.",
      ],
    },

    {
      qtype: "one-line-text-quest",
      question: "The series Id for these CPI data is:",
      Ref: [
        "url_link",
        "https://fred.stlouisfed.org/series/CPIAUCSL",
        "Click the following link to view CPI data from FRED, which opens in a new tab.",
      ],
    },

    {
      qtype: "mc-quest",
      question: "This is _______ data that has been seasonally adjusted.",
      options: ["a. weekly", "b. monthly", "c. quarterly", "d. yearly"],
      Ref: "",
    },
    {
      qtype: "one-line-text-quest",
      question:
        "The CPI for January of 2024 (shown as 2024-01-01 in the downloaded data in FRED) was ______ and the CPI for January of 2025 (shown as 2025-01-01 in​ FRED) was ______. Please enter two numbers separated by a comma or semi-colon below, no other stuff.",
      Ref: [
        "url_link",
        "https://fred.stlouisfed.org/series/CPIAUCSL",
        "Click the following link to view CPI data from FRED, which opens in a new tab.",
      ],
    },
    {
      qtype: "one-line-text-quest",
      question:
        "Using the CPI values you entered above, calculate the inflation rate for the past year. The inflation rate was ______ percent. ​(Round your response to two decimal​ places.) Please enter a number below.",
      Ref: "",
    },
    {
      qtype: "graphing-quest",
      question:
        "Using the data from​ FRED, sketch the graphs of the two series above.",
      Ref: [
        "url_link",
        "https://fred.stlouisfed.org/",
        "For this exercise and the questions that follow, you will need to go to the given link below and enter at the search bar the series id for two variables: nominal gross domestic product​ (Series ID: GDP) and real gross domestic product​ (series ID: GDPC1). ",
      ],
    },
    {
      qtype: "one-line-text-quest",
      question:
        "Using the data from​ FRED, enter the values for the fourth quarter of 2024 ​(shown as 2024-10-01 in​ FRED) for the two series, GDP and GDPC1, separating the two figures by comma/semicolon:",
      Ref: "",
    },

    {
      qtype: "one-line-text-quest",
      question:
        "Given these​ values, the GDP deflator for this period is ___ ​(Enter your response rounded to two decimal​ places.) and similarly the GDP price deflator for the fourth quarter of 2023 was _____.​(Enter your response rounded to two decimal​ places.) Using this value along with the index computed above, the year-over-year rate of price inflation was ______ percent. ​(Enter your response rounded to one decimal​ place.) Please enter three numbers separated by a comma or semi-colon below, no other stuff.",
      Ref: "",
    },
  ],
}
