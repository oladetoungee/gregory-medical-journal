const processingCharges = {
  title: "Article Processing Charge (APC)",
  description:
      "Gregory Medical Journal requires an Article Processing Charge (APC) for accepted manuscripts. This fee is essential to cover the costs of publishing, including the peer review process, typesetting, and hosting.",
  charges: [
      {
          type: "Local Authors",
          amount: "₦50,000",
          details: "This rate applies to authors based in Nigeria. The APC covers all aspects of the publication process."
      },
      {
          type: "International Authors",
          amount: "$300",
          details: "This rate applies to authors outside Nigeria. The APC covers the full publication process and ensures international distribution."
      },
      {
          type: "Waivers",
          details: "We offer a limited number of waivers for authors from low-income countries or for research that demonstrates significant societal impact. Waiver applications should be submitted at the time of manuscript submission."
      },
      {
          type: "Payment Process",
          details: "The APC must be paid before the publication of the manuscript. Payment instructions will be provided upon acceptance of the manuscript."
      }
  ],
  refundPolicy: {
      title: "Refund Policy",
      details: "Once the article has been accepted and the APC paid, refunds will not be provided. Exceptions may be considered in cases of extraordinary circumstances."
  }
};

export default processingCharges;
