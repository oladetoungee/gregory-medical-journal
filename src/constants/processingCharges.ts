const processingCharges = {
    title: "Article Processing Charges",
    description: `
      Gregory Medical Journal charges a processing fee for each article submitted for publication.
      This fee covers the cost of editorial processes, peer review, and hosting the article on our
      platform.
    `,
    charges: [
      {
        type: "Standard Article",
        amount: "$300",
      },
      {
        type: "Review Article",
        amount: "$400",
      },
      {
        type: "Case Report",
        amount: "$200",
      },
      // Add more charge types as needed
    ],
    note: `
      Please note that the article processing charge is non-refundable. Discounts and waivers may be 
      available for authors from low-income countries or for exceptional cases.
    `,
  };

  export default processingCharges