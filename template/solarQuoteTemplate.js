// template/solarQuoteTemplate.js
const API_URL = process.env.VITE_API_URL || "http://localhost:5000";

module.exports = function generateSolarQuoteHTML(proposal) {
  const tableImage = proposal.tableImage
    ? (proposal.tableImage.startsWith('data:')
        ? proposal.tableImage
        : `${API_URL}/api/proposal/table/${proposal.tableImage}`)
    : null;

  const graphImage = proposal.graphimage
    ? (proposal.graphimage.startsWith('data:')
        ? proposal.graphimage
        : `${API_URL}/api/proposal/graph/${proposal.graphimage}`)
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
<section class="page w-full min-h-screen bg-white p-8 font-sans">
  <!-- Top header -->
  <div class="flex flex-col md:flex-row md:justify-between md:items-start">
    <!-- Logo -->
    <div class="flex items-center gap-4">
      <img src="${API_URL}/assets/logo.png" alt="Logo" class="w-24 h-auto" />
      <h1 class="text-4xl font-bold text-gray-800">Solar Proposal</h1>
    </div>
  </div>

  <!-- Prepared by / Prepared for -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
    <div class="space-y-2">
      <div class="text-2xl font-semibold text-gray-700">Prepared By</div>
      <div class="font-bold text-gray-900">SUNMAYO PRIVATE LIMITED</div>
      <div class="text-gray-600">26/18 Laxmi Garden, Sector 11, Gurgaon, Haryana 122001</div>
      <div class="flex items-center gap-2 text-gray-600">
        <img src="${API_URL}/assets/phone-call.png" alt="Phone" class="w-4 h-4" />
        <span>+91 9643800850</span>
      </div>
      <div class="flex items-center gap-2 text-gray-600">
        <img src="${API_URL}/assets/communication.png" alt="Email" class="w-4 h-4" />
        <span>info@sunmayo.com</span>
      </div>
      <div class="flex items-center gap-2 text-gray-600">
        <img src="${API_URL}/assets/worldwide.png" alt="Website" class="w-4 h-4" />
        <span>www.sunmayo.com</span>
      </div>
    </div>

    <div class="space-y-2">
      <h2 class="text-xl font-semibold text-gray-700">Prepared For:</h2>
      <div class="mt-3 text-gray-700 text-lg">
        <div class="font-medium">${proposal.clientName}</div>
        <div>${proposal.clientPhone}</div>
        <div>${proposal.clientEmail}</div>
        <div>${proposal.clientAddress}</div>
      </div>
    </div>
  </div>

  <!-- Hero images -->
  <div class="mt-10 rounded-xl overflow-hidden shadow-lg bg-gray-50">
    <img src="${API_URL}/assets/generate_logo.jpg" class="w-full h-72 my-3 object-contain" alt="Hero" />
    <img src="${API_URL}/assets/Solar_Proposal.jpg" class="w-full h-72 object-contain" alt="Hero" />
  </div>

  <!-- Footer -->
  <div class="mt-8 text-sm text-gray-500 text-center border-t pt-4">
    Page 1 • Cover
  </div>
</section>


<!-- PAGE 2: WELCOME -->
<section class="page bg-white p-6 rounded-2xl shadow-lg">
  <!-- Heading -->
  <h2 class="text-3xl font-bold mb-6">
    <span class="text-blue-800">Specifications</span> & Savings
  </h2>

  <!-- Three columns for specs -->
  <div class="grid grid-cols-3 gap-6 text-xl">
    <div class="flex flex-col items-start">
      <p class="font-semibold text-gray-700">Plant Capacity</p>
      <p class="text-blue-800 font-bold text-2xl">${proposal.projectsize} kW</p>
      <div class="bg-blue-700 w-20 h-1 mt-1"></div>
    </div>
    <div class="flex flex-col items-start">
      <p class="font-semibold text-gray-700">Structure Type</p>
      <p class="text-blue-800 font-bold text-2xl">${proposal.proposalStructure}</p>
      <div class="bg-blue-700 w-20 h-1 mt-1"></div>
    </div>
    <div class="flex flex-col items-start">
      <p class="font-semibold text-gray-700">Inverter</p>
      <p class="text-blue-800 font-bold text-2xl">
        ${proposal.invertortype || proposal.InvertorSize}
      </p>
      <div class="bg-blue-700 w-20 h-1 mt-1"></div>
    </div>
  </div>

  <!-- Savings & generation -->
  <div class="mt-10 grid grid-cols-3 gap-8 text-center">
    <div class="flex flex-col items-center">
      <img src="${API_URL}/assets/solar-power-plant.svg" alt="Solar Plant" class="w-12 h-12 mb-2" />
      <p class="text-gray-600">Yearly Consumption</p>
      <p class="text-2xl font-bold text-blue-800">${proposal.yearlyconsumption} kWh</p>
    </div>
    <div class="flex flex-col items-center">
      <img src="${API_URL}/assets/solar-generation.svg" alt="Solar Generation" class="w-12 h-12 mb-2" />
      <p class="text-gray-600">Estimated Yearly Generation</p>
      <p class="text-2xl font-bold text-blue-800">${proposal.yearlysolargeneration} kWh</p>
    </div>
    <div class="flex flex-col items-center">
      <img src="${API_URL}/assets/savings-icon.svg" alt="Savings" class="w-12 h-12 mb-2" />
      <p class="text-gray-600">Average Annual Savings</p>
      <p class="text-2xl font-bold text-blue-800">₹ ${proposal.annualSavings}</p>
    </div>
  </div>

  <!-- Graph -->
  <div class="mt-10">
    ${graphImage
      ? `<div>
          <h3 class="text-xl font-semibold mb-2 text-gray-700">Savings Graph</h3>
          <img src="${graphImage}" alt="Graph Image" class="rounded-xl shadow-md border" />
         </div>`
      : ''
    }
  </div>

  <!-- Footer -->
  <div class="mt-8 text-sm text-gray-500 text-right">Page 3 • Specs & Savings</div>
</section>


<!-- PAGE 3: SPECIFICATION & SAVINGS -->

<!-- PAGE 4: COMMERCIAL OFFER -->
<section class="page bg-white p-6 rounded-2xl shadow-lg">
  <!-- Heading -->
  <h2 class="text-3xl font-bold mb-6 text-blue-800">Commercial Offer & Payment</h2>

  <!-- Table Image (optional) -->
  ${tableImage 
    ? `<div class="mb-6">
         <h3 class="font-semibold mb-2 text-gray-700">Offer Table</h3>
         <img src="${tableImage}" alt="Table Image" class="rounded-xl shadow-md border" />
       </div>` 
    : ''}

  <!-- Payment Schedule -->
  <div class="mt-6 text-xl">
    <div class="font-bold text-gray-800 mb-2 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2v6c0 1.105 1.343 2 3 2s3-.895 3-2v-6c0-1.105-1.343-2-3-2z" />
      </svg>
      Payment Schedule
    </div>
    <ul class="list-disc list-inside space-y-1 text-gray-700">
      <li>As a percentage of the Net Value of System.</li>
      <li><span class="font-semibold">30%</span> advance along with Purchase Order.</li>
      <li><span class="font-semibold">65%</span> Before dispatch of material, balance <span class="font-semibold">5%</span> after installation and commissioning.</li>
    </ul>
  </div>

  <!-- Payment Details -->
  <div class="mt-8 text-xl">
    <div class="font-bold text-gray-800 mb-2 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2z" />
      </svg>
      Payment Details
    </div>
    <p class="text-gray-700 mb-3">Payment can be paid in Cheque / Scanner code / Netbanking</p>
    <div class="bg-gray-50 p-4 rounded-xl border">
      <p><span class="font-semibold">Bank:</span> IDFC FIRST BANK</p>
      <p><span class="font-semibold">A/C:</span> SUNMAYO PRIVATE LIMITED — 10223162147</p>
      <p><span class="font-semibold">IFSC:</span> IDFB0021005</p>
    </div>
  </div>

  <!-- Terms -->
  <div class="mt-8 text-base text-gray-600 bg-gray-50 p-4 rounded-xl">
    <p><span class="font-semibold">Terms:</span> Prices are firm for 10 days from offer date. Delivery 2–3 weeks. Force majeure applies.</p>
  </div>

  <!-- Footer -->
  <div class="mt-6 text-sm text-gray-500 text-right">Page 4 • Commercial</div>
</section>


<!-- PAGE 5: BILL OF MATERIALS -->
<section class="page px-10 py-12 bg-white rounded-xl shadow-lg relative">
  <!-- Heading -->
  <h2 class="text-2xl font-bold text-gray-800 mb-6">
    Bill of Materials
  </h2>

  <!-- Panels Section -->
  <div class="text-lg text-gray-700 mb-6">
    <p><span class="font-semibold">Watt Peak:</span> ${proposal.Wattpeak} Wp</p>
    <p><span class="font-semibold">Panel Qty:</span> ${proposal.quantity} Nos</p>
    <p><span class="font-semibold">Panel Type:</span> ${proposal.paneltype}</p>
  </div>
  <div class="bg-blue-700 w-full h-0.5 mb-6"></div>

  <!-- Inverter Section -->
  <div class="text-lg text-gray-700 mb-6">
    <p><span class="font-semibold">Inverter:</span> ${proposal.InvertorSize} kW</p>
    <p><span class="font-semibold">Phase:</span> ${proposal.invertorPhase}</p>
    <p><span class="font-semibold">Phase Qty:</span> ${proposal.invertorquantitiy} Nos</p>
  </div>
  <div class="bg-blue-700 w-full h-0.5 mb-6"></div>

  <!-- Cable + Warranty Row -->
  <div class="grid grid-cols-2 divide-x divide-gray-300 text-lg text-gray-700 mb-6">
    <!-- Cable -->
    <div class="pr-6">
      <h3 class="text-blue-700 text-xl font-semibold mb-2">Cable</h3>
      <p><span class="font-semibold">Brand:</span> ${proposal.cableBrands}</p>
    </div>

    <!-- Warranty -->
    <div class="pl-6">
      <h3 class="text-blue-700 text-xl font-semibold mb-2">Warranty</h3>
      <p><span class="font-semibold">Panel:</span> ${proposal.warranty} Year(s)</p>
      <p><span class="font-semibold">Panel Performance:</span> ${proposal.performancewarranty} Year(s)</p>
      <p><span class="font-semibold">Inverter:</span> ${proposal.Invertorwarranty} Year(s)</p>
      <p><span class="font-semibold">Balance of System:</span> ${proposal.systemwarranty} Year(s)</p>
    </div>
  </div>

  <!-- Balance of System -->
  <div class="text-lg text-gray-700">
    <h3 class="font-semibold mb-2">Balance of System</h3>
    <p>${proposal.balanceOfSystem}</p>
  </div>

  <!-- Footer -->
  <div class="page-footer absolute bottom-3 right-5 text-sm text-gray-400">
    Page 5 • Bill of Materials
  </div>
</section>


<!-- PAGE 6: SCOPE & ACCEPTANCE -->
<section class="page">
  <!-- Terms & Conditions -->
  <div class="text-xl leading-relaxed">
    <h2 class="font-bold text-2xl mb-4">Terms & Conditions</h2>
    <ol class="list-decimal list-inside space-y-2">
      <li>Packing is included in the offer.</li>
      <li>Transportation charges are in our scope.</li>
      <li>Civil and digging are in our scope.</li>
      <li>Prices quoted are firm and valid for 10 days from the date of offer. After this period, reconfirmation from our office is required.</li>
      <li>Water supply at site will be provided by customer free of cost during installation and commissioning.</li>
      <li>Closed, covered, locked storage will be provided by customer during installation and commissioning.</li>
      <li>We will start the approval process as soon as we receive order confirmation. From confirmation until 10 days before installation, cancellation charges of INR 25,000 or 5% of system cost (whichever is higher) will apply.</li>
      <li>Delivery: 2–3 weeks from the date of technically and commercially cleared order.</li>
      <li>Force Majeure clause: This quotation and resulting contract are subject to the standard force majeure conditions.</li>
      <li>Includes licensing charges.</li>
    </ol>
  </div>

  <!-- Divider -->
  <div class="bg-blue-700 w-full h-0.5 my-8"></div>

  <!-- Signature / Footer -->
  <div class="grid grid-cols-2 gap-6 items-center">
    <!-- Logo -->
    <img src="${API_URL}/assets/generate_logo.jpg" alt="Logo" class="w-40 h-32 object-contain" />

    <!-- Contact Info -->
    <div class="space-y-2 text-xl">
      <div class="font-bold">Thanks & Regards,</div>
      <div class="font-semibold">SUNMAYO PRIVATE LIMITED</div>
      <div class="text-lg">26/18 Laxmi Garden, Sector 11, Gurgaon, Haryana 122001</div>

      <div class="flex items-center gap-2 text-lg">
        <img src="${API_URL}/assets/phone-call.png" alt="Phone" class="w-5 h-5" />
        <span>+91 9643800850</span>
      </div>

      <div class="flex items-center gap-2 text-lg">
        <img src="${API_URL}/assets/communication.png" alt="Email" class="w-5 h-5" />
        <span>info@sunmayo.com</span>
      </div>

      <div class="flex items-center gap-2 text-lg">
        <img src="${API_URL}/assets/worldwide.png" alt="Website" class="w-5 h-5" />
        <span>www.sunmayo.com</span>
      </div>
    </div>
  </div>

  <!-- Date -->
  <div class="mt-6 text-sm">Date: ____________________</div>

  <!-- Footer -->
  <div class="page-footer">Page 6 • Scope & Acceptance</div>
</section>

</body>
</html>
`;
};
