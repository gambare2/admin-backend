const path = require("path");
const API_URL = process.env.VITE_API_URL;
// const API_URL = "http://localhost:5000";


// ${API_URL}/assets/logo.png
module.exports = function generateSolarQuoteHTML(proposal) {
  // inside generateSolarQuoteHTML(proposal)

  const productRows = proposal.products?.map(p => {
    const qty = p.qty || 1;
    const amount = qty * (p.price || 0);
    return `
    <tr>
      <td class="border p-2">${p.name}</td>
      <td class="border p-2 text-right">₹${p.price?.toLocaleString() || 0}</td>
      <td class="border p-2 text-right">${qty}</td>
      <td class="border p-2 text-right">₹${amount.toLocaleString()}</td>
    </tr>
  `;
  }).join("") || "";

  // services may not have qty, so default to 1
  const serviceRows = proposal.services?.map(s => {
    const qty = s.qty || 1;
    const amount = qty * (s.price || 0);
    return `
    <tr>
      <td class="border p-2">${s.name}</td>
      <td class="border p-2 text-right">₹${s.price?.toLocaleString() || 0}</td>
      <td class="border p-2 text-right">${qty}</td>
      <td class="border p-2 text-right">₹${amount.toLocaleString()}</td>
    </tr>
  `;
  }).join("") || "";

  // calculate totals
  const subtotal =
    (proposal.products?.reduce((sum, p) => sum + (p.qty || 1) * (p.price || 0), 0) || 0) +
    (proposal.services?.reduce((sum, s) => sum + (s.qty || 1) * (s.price || 0), 0) || 0);

  const gstPercent = 12;
  const gstAmount = (subtotal * gstPercent) / 100;
  const totalCost = subtotal + gstAmount;

  const subsidy = proposal.costs?.subsidy || 0;
  const netPayable = totalCost - subsidy;

  const amountInWords = proposal.costs?.amountInWords || "";

  return `

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Solar Proposal — 7 Page Template</title>
  <!-- Tailwind via CDN for quick styling (replace with your build in prod) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Print / PDF friendly page sizing (A4) */
    @page { size: A4; margin: 12mm; }
    body { margin: 0; -webkit-print-color-adjust: exact; }
    .page { width: 210mm; height: 297mm; padding: 18mm; box-sizing: border-box; page-break-after: always; }
    .logo { width: 160px; }
    .small { font-size: 12px; }
    .muted { color: #6b7280; }
    .hr { height: 1px; background: #e5e7eb; margin: 12px 0; }
    /* Utility to ensure images don't overflow when rendering to PDF */
    .img-fit { object-fit: contain; display:block; }
    /* Footer position */
    .page-footer { position: absolute; bottom: 18mm; left: 18mm; right: 18mm; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body class="bg-white text-gray-900 font-sans">

  <!-- PAGE 1: Cover -->
  <section class="page relative">
    <header class="flex justify-between items-start">
      <div>
        <img src="${API_URL}/assets/logo.png" alt="Company Logo" class="logo" />
        <div class="mt-4 text-sm muted bg-[#070e3e] rounded-l-full px-5">www.sunmayo.com <span class = "rounded-r-full px-5 bg-green-500"> 🌐 </span></div>
      </div>
      <div class="text-right">
        <h1 class="text-4xl font-bold">Solar Proposal</h1>
        <div class="mt-6 text-sm muted">Prepared By</div>
        <div class="font-semibold">SUNMAYO PRIVATE LIMITED</div>
        <div class="small muted">26/18 Laxmi Garden, Sector 11, Gurgaon, Haryana 122001</div>
      </div>
    </header>

    <main class="mt-12">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <h2 class="text-xl font-semibold">Prepared for: </h2>
          <div class="mt-3">
            <div class="font-medium">${proposal.clientName}</div>
            <div class="font-normal">+91 ${proposal.clientPhone}</div>
            <div class="font-normal">+91 ${proposal.clientEmail}</div>
            <div class="font-normal">${proposal.clientAddress}</div>
          </div>
        </div>
         <img src="${API_URL}/assets/solar_background.jpg" class= "h-full w-full" alt="Company Logo" class="logo" />

         <div style="page-break-before: always;"></div>
         <section class="page bg-white relative rounded-md shadow-md">
    <!-- Header -->
    <div class="flex justify-between items-start">
      <h1 class="text-3xl font-bold">Welcome</h1>
      <img src="${API_URL}/assets/logo.png" alt="Logo" class="w-24" />
    </div>

    <!-- Main Content -->
    <div class="mt-6 text-gray-900 text-sm leading-6">
      <h2 class="font-bold">MR. ${proposal.clientName}</h2>
      <p class="mt-2">
        Dear MR. ${proposal.clientName} <br/><br/>
        It has been a privilege to understand your requirement and give you the best solution for you. 
        As required, we have committed to the highest level of quality. That’s why we select the best 
        components and industry-leading performance models to ensure your system will produce optimally. 
        Our highly trained installation crews take pride in delivering beautiful well-made solar arrays. 
        From the panels to the bolts on the roof, we’ll deliberately consider every piece of your installation 
        so you can rest easy throughout its many years of service. We take great pride in our guarantee of 
        complete customer satisfaction.
      </p>
      <p class="mt-4">
        We are looking forward to help you and have a long-term relationship with you. 
        Please go through the proposal and give us your feedback.
      </p>

      <p class="mt-6">
        <span class="font-semibold">Thanks & Regards,</span><br/>
        SunMayo Private Limited <br/>
        +91 9643800850 <br/>
        SUNMAYO PRIVATE LIMITED
      </p>
    </div>

    <!-- Decorative Footer Shape -->
    <div class="absolute bottom-0 left-0 right-0 flex justify-between">
      <div class="w-0 h-0 border-l-[120px] border-t-[80px] border-l-transparent border-t-green-600"></div>
      <div class="w-0 h-0 border-r-[120px] border-t-[80px] border-r-transparent border-t-blue-900"></div>
    </div>
  </section>
</div>
      </div>
    </main>
    <div style="page-break-before: always;"></div>

     <section class="page bg-white shadow relative rounded-md">
    <!-- Logo & Title -->
    <div class="flex justify-between items-start">
      <h2 class="text-2xl font-bold text-blue-700">${proposal.projectsize} KW</h2>
       <img src="${API_URL}/assets/logo.png" alt="Company Logo" class="logo" />
    </div>

    <!-- Specification -->
    <h3 class="mt-4 text-2xl font-bold">Specification</h3>
    <div class="mt-4 grid grid-cols-3 gap-4 text-sm">
      <div class="border-l-4 border-blue-700 pl-3">
        <p class="text-gray-700 font-bold">Plant Capacity:</p>
        <p class="font-semibold text-blue-700">${proposal.projectsize} KW</p>
      </div>
      <div class="border-l-4 border-blue-700 pl-3">
        <p class="text-gray-700 font-bold">Structure Type:</p>
        <p class="font-semibold text-blue-700">${proposal.proposalStructure}</p>
      </div>
      <div class="border-l-4 border-blue-700 pl-3">
        <p class="text-gray-700 font-bold">Inverter Details:</p>
        <p class="font-semibold text-blue-700">${proposal.invertortype}</p>
      </div>
      <div>
        <h3 class="font-bold text-xl">Savings & Payback</h3>
        <p class="font-semibold mt-2">Yearly consumption: <span class="font-semibold">${proposal.yearlyconsumption} kWh</span></p>
        <p class="font-semibold">Estimated yearly solar generation: <span class="font-semibold">${proposal.yearlysolargeneration} kWh</span></p>
      </div>
    </div>
    <!-- Graph -->
    <div class="mt-10">
      <!-- Replace this placeholder with a chart image from frontend -->
      ${proposal.plotgraph ? `<img src="${proposal.plotgraph}" class="w-full h-full object-contain border rounded" alt="Chart"/>` : ''}
    </div>
  </section>



    <div style="page-break-before: always;"></div>
     <section class="page bg-white shadow relative border border-purple-400 rounded-md">
    <!-- Header -->
    <div class="flex justify-between items-start">
      <h1 class="text-3xl font-bold">
        <span class="text-blue-700">Commercial</span> Offer
      </h1>
      <img src="${API_URL}/assets/logo.png" alt="Company Logo" class="logo" />
    </div>

    <!-- Pricing Table -->
    <div class="mt-6">
       ${proposal.plotgraph ? `<img src="${proposal.plotgraph}" class="w-full h-full object-contain border rounded" alt="Chart"/>` : ''}
    </div>

    <!-- Payment Schedule -->
    <div class="mt-8 text-sm">
      <h2 class="text-lg font-bold">Payment Schedule:</h2>
      <p class="mt-2">
        As a percentage of the Net Value of System • 30% advance along with Purchase Order •
        65% Before the Dispatch of material • Balance 05% after installation and commissioning.
      </p>
    </div>

    <!-- Payment Details -->
    <div class="mt-6 text-sm">
      <h2 class="text-lg font-bold">Payment Details:</h2>
      <p class="mt-2">Payment can be paid in Cheque / Scanner Code / Netbanking</p>
      <p class="mt-2">
        <span class="font-semibold">BANK DETAILS:</span> IDFC FIRST BANK<br/>
        <span class="font-semibold">ACCOUNT NAME:</span> SUNMAYO PRIVATE LIMITED<br/>
        <span class="font-semibold">ACCOUNT NO.:</span> 10223162147<br/>
        <span class="font-semibold">IFSC CODE:</span> IDFB0021005<br/>
        <span class="font-semibold">BRANCH:</span> SECTOR 15 GURGAON
      </p>
    </div>
  </section>
  <div style="page-break-before: always;"></div>


  <!-- PAGE 4: Bill of Materials -->
<section class="page bg-white shadow relative rounded-md">
    <!-- Header -->
    <div class="flex justify-between items-start">
      <h1 class="text-2xl font-bold"><span class = "text-blue-700">Bill</span> of Materials</h1>
      <img src="${API_URL}/assets/logo.png" alt="Company Logo" class="logo" />
    </div>

    <!-- Panel -->
    <div class="mt-6">
      <h2 class="text-lg font-bold text-blue-700">Panel</h2>
      <p class="text-sm">Watt Peak: ${proposal.Wattpeak} </p>
      <p class="text-sm">Panel Qty: ${proposal.quantity} Nos.</p>
      <p class="text-sm">Panel type: ${proposal.paneltype}</p>
      <div class="flex justify-between items-center mt-2">
        <img src="/images/premier.png" alt="Premier Logo" class="h-6" />
        <img src="/images/renew.png" alt="ReNew Logo" class="h-6" />
      </div>
      <div class="divider"></div>
    </div>

    <!-- Inverter -->
    <div class="mt-4">
      <h2 class="text-lg font-bold text-blue-700">Inverter</h2>
      <p class="text-sm">Inverter Size: ${proposal.InvertorSize} kW</p>
      <p class="text-sm">Phase: ${proposal.invertorPhase}</p>
      <p class="text-sm">Phase Qty: ${proposal.invertorquantitiy} Nos.</p>
      <div class="mt-2">
        <img src="/images/premier.png" alt="Premier Logo" class="h-6" />
      </div>
      <div class="divider"></div>
    </div>

    <!-- Cable + Warranty -->
    <div class="mt-4 grid grid-cols-2 gap-6">
      <div>
        <h2 class="text-lg font-bold text-blue-700">Cable</h2>
        <p class="text-sm">Cable Brands: ${proposal.cableBrands}</p>
      </div>
      <div>
        <h2 class="text-lg font-bold text-blue-700">Warranty</h2>
        <p class="text-sm">Panel: ${proposal.warranty} Year(s)</p>
        <p class="text-sm">Panel Performance: ${proposal.performancewarranty} Year(s)</p>
        <p class="text-sm">Inverter: ${proposal.Invertorwarranty} Year(s)</p>
        <p class="text-sm">Balance Of System: 5 Year(s)</p>
      </div>
    </div>

    <!-- Balance of System -->
    <div class="mt-6">
      <h2 class="text-lg font-bold text-blue-700">Balance of System</h2>
      <p>${proposal.balanceOfSystem}</p>
    </div>
  </section>
  <div style="page-break-before: always;"></div>

  <!-- PAGE 5: Payment & Terms -->
  <section class="page relative">
      <div class="mt-6">
        <h4 class="font-bold text-2xl">Terms & Conditions</h4>
        <ul class="list-disc ml-6 small mt-2 muted">
          <li> Packing is included in the offer</li>
          <li> Transportation charges our scope</li>
          <li> Civil and digging are at our scope</li>
          <li> Prices quotes are firm and valid for 10 days from the date of offer. After this period a reconfirmation from our office should be taken</li>
          <li>Water supply at site will be provided by customer free of cost during the time of installation and commissioning</li>
          <li>Closed, covered, locked stores will be provided by customer during the time of installation and commissioning</li>
          <li>We will start the approval process as soon as we receive order conformation. From the time of confirmation till 10 days before installation day 1, there will be a nominal cancellation charge of INR 25,000 or 5% of system cost, whichever is higher.</li>
          <li> Delivery: 2-3 weeks from the date of technically and commercially cleared order.</li>
          <li>Force Major clause: this quotation as well as the resulting contract are subject to the standard force majeure condition</li>
          <li>Include lesining charges</li>
        </ul>
      </div>
    </div>

    <div class="page-footer small muted">Page 5 • Commercial</div>
  </section>

  <!-- PAGE 6: Site Details & Scope -->
  <section class="page relative">
    <h2 class="text-2xl font-semibold">Scope of Work & Site Details</h2>
    <div class="mt-4 small">
      <h3 class="font-semibold">Our Scope</h3>
      <p class="mt-2">${proposal.ourScope}</p>

      <h3 class="mt-4 font-semibold">Customer Scope</h3>
      <p class="mt-2">${proposal.customerScope}</p>

      <div class="mt-6">
        <h4 class="font-semibold">Site Address</h4>
        <p class="mt-2">${proposal.clientAddress}</p>
      </div>
    </div>

    <div class="page-footer small muted">Page 6 • Scope</div>
  </section>

  <!-- PAGE 7: Signature / Acceptance -->
  <section class="page relative">
    <h2 class="text-2xl font-semibold">Acceptance & Signature</h2>
    <p class="mt-4 small">To confirm acceptance of this proposal, please sign below and return a scanned copy or whatsapp a photo to our office.</p>

    <div class="mt-8 grid grid-cols-2 gap-6">
      <div>
        <div class="h-40 border rounded-md flex items-center justify-center">Customer Signature</div>
        <div class="mt-2 small muted">Name: ${proposal.clientName}</div>
      </div>

      <div>
        <div class="h-40 border rounded-md flex items-center justify-center">Company Authorised Signatory</div>
        <div class="mt-2 small muted">SUNMAYO PRIVATE LIMITED</div>
      </div>
    </div>

    <div class="mt-8 small muted">Date: ____________________</div>

    <div class="page-footer small muted">Page 7 • Acceptance</div>
  </section>

</body>
</html>

  `;
};

