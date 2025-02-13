export const quiz = {
  //qtype: "mc-quest" | "float-num-quest" | "one-line-text-quest" | "manylines-text-quest" | "graphing-quest";
  questions: [
    // {
    //   qtype: "mc-quest",
    //   question:
    //     "A fall in prices (of G & S) that increases the real value of consumers' wealth would",
    //   options: [
    //     "A. increase AD",
    //     "B. decrease AD",
    //     "C. increase aggregate ouput demanded",
    //     "D. decrease aggregate ouput demanded",
    //   ],
    //   Ref: "",
    // },
    // {
    //   qtype: "graphing-quest",
    //   question:
    //     "Draw the AD-SRAS-LRAS diagram for the U.S. economy starting in a long-run equilibrium. A boom occurs in Canada.  Use your diagram to determine the SR and LR effects on U.S. GDP, the price level, and unemployment.",
    //   Ref: "",
    // },
    {
      qtype: "one-line-text-quest",
      question:
        "A. Using the information in the above table, compute CPI for the three years and the three values by separating them by commas or semicolon. ",
      Ref: [
        "img",
        "actCpi.png",
        "Use the folowing to answer the questions below; assume the basket is 4 hot dogs and 2 hamburgers. ",
      ],
    },

    {
      qtype: "one-line-text-quest",
      question:
        "B.  Using the information in the above table, compute inflation between the years and please enter the two values by separating them by commas or semicolon. ",
      Ref: "",
    },
    // {
    //   qtype: "manylines-text-quest",
    //   question: "Show your work for the previous question. ",
    //   Ref: "",
    // },
    // {
    //   qtype: "one-line-text-quest",
    //   question:
    //     "C. What part of the percentage increase in NGDP is due to change in prices? Recall that Nominal GDP growth is the growth in production and growth of prices",
    //   Ref: "",
    // },
    // {
    //   qtype: "manylines-text-quest",
    //   question: "Show your work for the previous question. ",
    //   Ref: "",
    // },
  ],
}
