// template/solarQuoteTemplate.js
const API_URL = process.env.VITE_API_URL || "http://localhost:5000";

module.exports = function generateSolarQuoteHTML(proposal) {
  const graphImage = proposal.plotgraph
    ? (proposal.plotgraph.startsWith("data:")
        ? proposal.plotgraph
        : `${API_URL}/api/proposal/graph/${proposal.plotgraph}`) // if you store id
    : null;

  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Solar Proposal – ${proposal.clientName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @page { size: A4; margin: 15mm; }
    body { margin: 0; -webkit-print-color-adjust: exact; font-family: sans-serif; }
    .page {
      width: 210mm; height: 297mm;
      box-sizing: border-box;
      page-break-after: always;
      padding: 15mm;
      position: relative;
    }
    .logo { width: 150px; }
    .page-footer {
      position: absolute;
      bottom: 10mm; left: 15mm; right: 15mm;
      font-size: 12px; color: #6b7280;
    }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body class="bg-white text-gray-900">

<!-- PAGE 1: COVER -->
<section class="page">
  <div class="flex justify-between items-start">
    <div>
      <img src="${API_URL}/assets/logo.png" alt="Logo" class="logo" />
      <div class="mt-4 text-sm text-gray-500">www.sunmayo.com</div>
    </div>
    <div class="text-right">
      <h1 class="text-4xl font-bold">Solar Proposal</h1>
      <div class="mt-4 text-sm">Prepared By</div>
      <div class="font-semibold">SUNMAYO PRIVATE LIMITED</div>
      <div class="text-xs text-gray-500">26/18 Laxmi Garden, Sector 11, Gurgaon, Haryana 122001</div>
    </div>
  </div>

  <div class="mt-12 grid grid-cols-2 gap-6">
    <div>
      <h2 class="text-xl font-semibold">Prepared for:</h2>
      <div class="mt-3 text-sm">
        <div class="font-medium">${proposal.clientName}</div>
        <div>${proposal.clientPhone}</div>
        <div>${proposal.clientEmail}</div>
        <div>${proposal.clientAddress}</div>
      </div>
    </div>
    <div class="flex items-center justify-center bg-gray-100 rounded">
      <img src="${API_URL}/assets/solar_background.jpg" alt="Hero" />
    </div>
  </div>
  <div class="page-footer">Page 1 • Cover</div>
</section>

<!-- PAGE 2: WELCOME -->
<section class="page">
  <h2 class="text-3xl font-bold">Welcome</h2>
  <div class="mt-4 text-sm">Dear <span class="font-semibold">${proposal.clientName}</span>,</div>
  <p class="mt-4 leading-6 text-sm">
    It has been a privilege to understand your requirement and give you the best solution for you.
    We select the best components and industry-leading performance models to ensure your system will
    produce optimally. Our highly trained installation crews take pride in delivering beautiful,
    well-made solar arrays.
  </p>
  <ul class="list-disc ml-6 mt-4 text-sm">
    <li>High-efficiency panels with long term performance warranty.</li>
    <li>Robust hot-dip galvanised elevated structure.</li>
    <li>Turnkey installation with quality-tested BOS components.</li>
  </ul>
  <div class="mt-8 text-sm">
    Thanks & Regards,<br/>
    SunMayo Private Limited<br/>
    +91 9643800850
  </div>
  <div class="page-footer">Page 2 • Welcome</div>
</section>

<!-- PAGE 3: SPECIFICATION & SAVINGS -->
<section class="page">
  <h2 class="text-2xl font-bold">Specifications & Savings</h2>
  <div class="mt-4 grid grid-cols-3 gap-4 text-sm">
    <div>
      <p class="font-semibold">Plant Capacity</p>
      <p>${proposal.projectsize} kW</p>
    </div>
    <div>
      <p class="font-semibold">Structure Type</p>
      <p>${proposal.proposalStructure}</p>
    </div>
    <div>
      <p class="font-semibold">Inverter</p>
      <p>${proposal.invertortype || proposal.InvertorSize}</p>
    </div>
  </div>
  <div class="mt-4 text-sm">
    Yearly consumption: <span class="font-semibold">${proposal.yearlyconsumption} kWh</span><br/>
    Estimated yearly solar generation: <span class="font-semibold">${proposal.yearlysolargeneration} kWh</span>
  </div>
  <div class="mt-8">
    ${graphImage ? `<img src="${graphImage}" alt="Graph" class="border rounded"/>` : ""}
  </div>
  <div class="page-footer">Page 3 • Specs & Savings</div>
</section>

<!-- PAGE 4: COMMERCIAL OFFER -->
<section class="page">
  <h2 class="text-2xl font-bold">Commercial Offer & Payment</h2>
  <div class="mt-4 text-sm">
    30% advance along with Purchase Order • 65% before dispatch • 5% after installation
  </div>
  <div class="mt-4 text-sm">
    <span class="font-semibold">Bank:</span> IDFC FIRST BANK<br/>
    <span class="font-semibold">A/C:</span> SUNMAYO PRIVATE LIMITED — 10223162147<br/>
    <span class="font-semibold">IFSC:</span> IDFB0021005
  </div>
  <div class="mt-6 text-sm">
    Terms: Prices are firm for 10 days from offer date. Delivery 2–3 weeks. Force majeure applies.
  </div>
  <div class="page-footer">Page 4 • Commercial</div>
</section>

<!-- PAGE 5: BILL OF MATERIALS -->
<section class="page">
  <h2 class="text-2xl font-bold">Bill of Materials</h2>
  <div class="mt-4 text-sm">
    Panel: ${proposal.Wattpeak} Wp × ${proposal.quantity} Nos<br/>
    Inverter: ${proposal.InvertorSize} kW × ${proposal.invertorquantitiy} Nos<br/>
    Warranty: Panel ${proposal.warranty} yrs • Performance ${proposal.performancewarranty} yrs<br/>
  </div>
  <div class="mt-4 text-sm">
    Balance of System:<br/>${proposal.balanceOfSystem}
  </div>
  <div class="page-footer">Page 5 • Bill of Materials</div>
</section>

<!-- PAGE 6: SCOPE & ACCEPTANCE -->
<section class="page">
  <h2 class="text-2xl font-bold">Scope & Acceptance</h2>
  <h3 class="mt-4 font-semibold">Our Scope</h3>
  <p class="text-sm mt-1">${proposal.ourScope}</p>
  <h3 class="mt-4 font-semibold">Customer Scope</h3>
  <p class="text-sm mt-1">${proposal.customerScope}</p>
  <h3 class="mt-4 font-semibold">Site Address</h3>
  <p class="text-sm mt-1">${proposal.clientAddress}</p>
  <div class="mt-8 grid grid-cols-2 gap-6">
    <div>
      <div class="h-24 border flex items-center justify-center">Customer Signature</div>
      <div class="mt-1 text-xs">Name: ${proposal.clientName}</div>
    </div>
    <div>
      <div class="h-24 border flex items-center justify-center">Company Authorised Signatory</div>
      <div class="mt-1 text-xs">SUNMAYO PRIVATE LIMITED</div>
    </div>
  </div>
  <div class="mt-4 text-xs">Date: ____________________</div>
  <div class="page-footer">Page 6 • Scope & Acceptance</div>
</section>

</body>
</html>
`;
};
