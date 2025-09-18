const path = require("path");
const API_URL = process.env.VITE_API_URL;
// const API_URL = "http://localhost:5000";



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
  <title>Proposal - MR. NISHEETH PANDEY</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @page { size: A4; margin: 20mm; }
  </style>
</head>
<body class="font-sans text-gray-800 text-[12px] leading-relaxed">
  <div class="max-w-[800px] mx-auto">

    <header class="flex justify-between items-start mb-6">
      <img src="${API_URL}/assets/logo.png" class="h-16" />
      <div class="text-right text-pretty text-[11px]">
        <strong class="text-[14px] block">SUNMAYO PRIVATE LIMITED</strong>
        26/18 Laxmi Garden,<br/>
        Sector 11,<br/>
        Gurgaon, Haryana 122001<br/>
        Contact: +91 9643800850<br/>
        Mail us at: info@sunmayo.com<br/>
        www.sunmayo.com
      </div>
    </header>

    <h1 class="text-center text-2xl font-bold text-[#0a4b78] border-b pb-2">SOLAR PROPOSAL</h1>
    <section class="bg-gray-100 p-3 rounded-md mt-3">
      <div class="flex justify-between gap-5">
        <div>
          <h2 class="font-bold text-3xl">Prepared For:</h2>
          MR. [cite_start]NISHEETH PANDEY [cite: 3, 15, 16]<br/>
          [cite_start]+919971490782 [cite: 4]<br/>
          H.NO. 25, 2ND FLOOR BLOCK-E,<br/>
          [cite_start]ASHOK VIHAR, DELHI [cite: 5, 6]
        </div>
        <div class="text-right">
          <h2 class="font-bold text-2xl">Prepared By:</h2>
          [cite_start]SUNMAYO PRIVATE LIMITED [cite: 8]<br/>
          26/18 Laxmi Garden, Sector 11,<br/>
          Gurgaon, Haryana 122001<br/>
        </div>
      </div>
    </section>
  </div>
  
  <div style="page-break-before: always;"></div>

  <div class="max-w-2xl w-full bg-white p-8 rounded-md shadow">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-[#0a4b78]">Welcome</h1>
      <img src="${API_URL}/assets/logo.png" class="h-16" />
    </div>

    <div class="mb-10">
      <h2 class="text-2xl font-semibold mb-2">MR. [cite_start]NISHEETH PANDEY [cite: 15]</h2>
      <div class="h-1 w-10 bg-[#0a4b78] mb-6"></div>

      <p class="mb-4 text-lg">
        Dear <strong>MR. [cite_start]NISHEETH PANDEY</strong> [cite: 16]
      </p>
      <p class="mb-4 text-xl">
        [cite_start]It has been a privilege to understand your requirement and give you the best solution for you[cite: 18]. [cite_start]As required, we have committed to the highest level of quality[cite: 19]. [cite_start]That's why we select the best components and industry-leading performance models to ensure your system will produce optimally[cite: 20].
      </p>
      <p class="mb-4 text-xl">
        [cite_start]Our highly trained installation crews take pride in delivering beautiful well-made solar arrays[cite: 21]. [cite_start]From the panels to the bolts on the roof, we'll deliberately consider every piece of your installation so you can rest easy throughout its many years of service[cite: 22]. [cite_start]We take great pride in our guarantee of complete customer satisfaction[cite: 23].
      </p>
      <p class="mb-4 text-xl">
        [cite_start]We are looking forward to help you and have a long-term relationship with you[cite: 24, 25]. [cite_start]Please go through the proposal and give us your feedback[cite: 25].
      </p>
    </div>

    <div class="mt-8 text-lg">
      [cite_start]<p class="font-bold">Thanks & Regards, [cite: 26]</p>
      [cite_start]<p class="font-medium">SunMayo Private Limited [cite: 27]</p>
      [cite_start]<p class="text-lg">+91 9643800850 [cite: 28]</p>
      [cite_start]<p class="uppercase font-semibold">SUNMAYO PRIVATE LIMITED [cite: 29]</p>
    </div>
  </div>

  <div style="page-break-before: always;"></div>

  <div class="max-w-3xl w-full bg-white p-10 text-lg ">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-[#0a4b78]">
          5 KW
        </h1>
        [cite_start]<p class="text-gray-600 text-xl">Specification [cite: 30, 31]</p>
      </div>
      <img src="${API_URL}/assets/logo.png" class="h-16" />
    </div>

    <div class="grid grid-cols-3 gap-6 mb-8">
      <div>
        <p class="text-gray-600">Plant Capacity:</p>
        [cite_start]<p class="font-bold text-[#0a4b78]">5 KW [cite: 36, 39]</p>
      </div>
      <div>
        <p class="text-gray-600">Structure Type:</p>
        [cite_start]<p class="font-bold text-[#0a4b78]">Elevated [cite: 37, 40]</p>
      </div>
      <div>
        <p class="text-gray-600">Project Details:</p>
        [cite_start]<p class="font-bold text-[#0a4b78]">String Inverter [cite: 38, 41]</p>
      </div>
    </div>
    
    <div class="flex justify-between items-center my-6">
      <div class="text-center w-full">
        <img src="${API_URL}/assets/chart.png" alt="Electricity Bill Before and After Solar Bar Chart" class="mx-auto" />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6 mb-8 mt-12">
      <div>
        [cite_start]<h2 class="text-2xl font-bold text-[#0a4b78]">Solar Savings & Payback Period [cite: 42]</h2>
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-6">
      <div>
        <p class="font-semibold text-gray-600">Payback Period:</p>
        [cite_start]<p class="font-bold text-[#0a4b78] text-xl">5.4 Years [cite: 43, 46]</p>
      </div>
      <div>
        <p class="font-semibold text-gray-600">Average Yearly Generation:</p>
        [cite_start]<p class="font-bold text-[#0a4b78] text-xl">7300 Units [cite: 44, 47]</p>
      </div>
      <div>
        <p class="font-semibold text-gray-600">Average Annual Savings:</p>
        [cite_start]<p class="font-bold text-[#0a4b78] text-xl">₹ 62,050 [cite: 45, 48]</p>
      </div>
      <div>
        <p class="font-semibold text-gray-600">CO2 Reduction:</p>
        [cite_start]<p class="font-bold text-[#0a4b78] text-xl">7 Tonnes [cite: 52, 55]</p>
      </div>
      <div>
        <p class="font-semibold text-gray-600">Trees Saved:</p>
        [cite_start]<p class="font-bold text-[#0a4b78] text-xl">166 [cite: 51, 54]</p>
      </div>
      <div>
        <p class="font-semibold text-gray-600">Project Cost:</p>
        [cite_start]<p class="font-bold text-[#0a4b78] text-xl">₹3,35,710 [cite: 50, 53]</p>
      </div>
    </div>
  </div>

  <div style="page-break-before: always;"></div>

  <div class="max-w-2xl w-full mx-auto">
    <img src="${API_URL}/assets/logo.png" class="h-16" />
    <section class="mt-6">
      [cite_start]<h2 class="text-2xl font-bold text-[#0a4b78]">Commercial [cite: 78]</h2>
      [cite_start]<p class="text-xl font-medium">Offer [cite: 79]</p>
      <div class="w-12 h-[2px] bg-[#0a4b78] mt-1 mb-4"></div>

      <p class="text-sm mb-4">
        Price Quote & Payment schedule for <strong>5 KW Grid Tie Rooftop Solar System:</strong>
      </p>

      <table class="w-full border-collapse mt-4 text-sm">
        <thead class="bg-gray-100">
          <tr>
            [cite_start]<th class="border p-2 text-left">Description [cite: 80]</th>
            [cite_start]<th class="border p-2 text-right">Price per Kw [cite: 80]</th>
            [cite_start]<th class="border p-2 text-right">Quantity [cite: 80]</th>
            [cite_start]<th class="border p-2 text-right">Subtotal [cite: 80]</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            [cite_start]<td class="border p-2">System Cost [cite: 80]</td>
            [cite_start]<td class="border p-2 text-right">₹59,000 [cite: 80]</td>
            [cite_start]<td class="border p-2 text-right">5 [cite: 80]</td>
            [cite_start]<td class="border p-2 text-right">₹2,95,000 [cite: 80]</td>
          </tr>
          <tr>
            [cite_start]<td class="border p-2">Structure Cost [cite: 80]</td>
            [cite_start]<td class="border p-2 text-right">40 [cite: 80]</td>
            [cite_start]<td class="border p-2 text-right">1 [cite: 80]</td>
            [cite_start]<td class="border p-2 text-right">10 [cite: 80]</td>
          </tr>
          <tr>
            [cite_start]<td colspan="3" class="border p-2 font-medium">Subtotal [cite: 80]</td>
            [cite_start]<td class="border p-2 text-right">₹2,95,000 [cite: 80]</td>
          </tr>
          <tr>
            [cite_start]<td colspan="3" class="border p-2 font-medium">Tax GST (13.80%) [cite: 80]</td>
            [cite_start]<td class="border p-2 text-right">₹40,710 [cite: 80]</td>
          </tr>
          <tr class="font-semibold">
            [cite_start]<td colspan="3" class="border p-2">Total Cost [cite: 80]</td>
            [cite_start]<td class="border p-2 text-right">₹3,35,710 [cite: 80]</td>
          </tr>
          <tr>
            [cite_start]<td colspan="3" class="border p-2">Subsidy [cite: 80]</td>
            [cite_start]<td class="border p-2 text-right text-red-600">- ₹88,000 [cite: 80]</td>
          </tr>
          <tr class="bg-[#0a4b78] text-white font-bold">
            [cite_start]<td colspan="3" class="border p-2">Total [cite: 80]</td>
            [cite_start]<td class="border p-2 text-right">₹2,47,710 [cite: 80]</td>
          </tr>
        </tbody>
      </table>

      <div class="mt-2 text-sm font-medium">
        [cite_start]Amount in Words: Two Lakh Forty Seven Thousand Seven Hundred Ten Rupees [cite: 80]
      </div>

      <section class="mt-6">
        [cite_start]<h3 class="text-lg font-semibold text-[#0a4b78]">Payment Schedule: [cite: 82]</h3>
        <p class="text-sm leading-relaxed">
          [cite_start]As a percentage of the Net Value of System: 30% advance along with Purchase Order[cite: 83]. [cite_start]65% Before the Dispatch of material[cite: 84]. [cite_start]Balance 05% after installation and commissioning[cite: 84].
        </p>
      </section>

      <section class="mt-6">
        [cite_start]<h3 class="text-lg font-semibold text-[#0a4b78]">Payment Details: [cite: 85]</h3>
        <p class="text-sm leading-relaxed">
          [cite_start]Payment can be paid in Cheque/ scanner code/ Netbanking[cite: 86].<br/>
          [cite_start]<strong>BANK DETAILS:</strong> IDFC FIRST BANK [cite: 86]<br/>
          [cite_start]ACCOUNT NAME - SUNMAYO PRIVATE LIMITED [cite: 87]<br/>
          ACCOUNT NO. [cite_start]10223162147 [cite: 88]<br/>
          [cite_start]IFSC CODE-IDFB0021005 [cite: 89]<br/>
          [cite_start]BRANCH - SECTOR 15 GURGAON [cite: 90]
        </p>
      </section>
    </section>
  </div>
  
  <div style="page-break-before: always;"></div>
  
  <div class="max-w-2xl w-full mx-auto p-8 rounded-md shadow">
    <div class="flex justify-between items-center mb-6">
      [cite_start]<h1 class="text-3xl font-bold text-[#0a4b78]">Bill of Materials [cite: 91]</h1>
      <img src="${API_URL}/assets/logo.png" class="h-16" />
    </div>
    
    <div class="grid grid-cols-2 gap-6 mb-8">
      <div>
        [cite_start]<p class="font-bold">Panel [cite: 92]</p>
        [cite_start]<p>Watt Peak: 550 Wp [cite: 93]</p>
        [cite_start]<p>Panel Qty: 9 Nos. [cite: 94]</p>
        [cite_start]<p>Panel type: TopCon BiFacial [cite: 95]</p>
        [cite_start]<p>Brands: Premier Energies / ReNew POWER [cite: 97, 98]</p>
      </div>
      <div>
        [cite_start]<p class="font-bold">Inverter [cite: 99]</p>
        [cite_start]<p>Inverter Size: 10 kW [cite: 100]</p>
        [cite_start]<p>Phase: Single [cite: 101]</p>
        [cite_start]<p>Phase Qty: 1 Nos. [cite: 102]</p>
      </div>
      <div>
        [cite_start]<p class="font-bold">Cable [cite: 104]</p>
        [cite_start]<p>Cable Brands: Polycab [cite: 105]</p>
      </div>
      <div>
        [cite_start]<p class="font-bold">Balance of System [cite: 106]</p>
        [cite_start]<p>Net & Solar Meter: Genus / Secure [cite: 108]</p>
        [cite_start]<p>DC Cables & Conduits: Polycab Make 4mm Type1 [cite: 111]</p>
        [cite_start]<p>AC Cables: Polycab Make 10*2 Alu Armd [cite: 112]</p>
        [cite_start]<p>DCDB: Reputed Make [cite: 113]</p>
        [cite_start]<p>ACDB: Reputed Make [cite: 114]</p>
        [cite_start]<p>Termination Accessories: Reputed Make [cite: 115]</p>
        [cite_start]<p>Earthing (Pits, Strips and Cables): Reputed Make - 3 Nos. [cite: 116]</p>
        [cite_start]<p>Lightning Arrestor: Reputed Make - 1 Nos. [cite: 117]</p>
      </div>
    </div>

    <div class="mt-8">
      [cite_start]<h2 class="text-2xl font-bold text-[#0a4b78]">Warranty [cite: 107]</h2>
      [cite_start]<p>Panel: 12 Year(s) [cite: 109]</p>
      [cite_start]<p>Panel Performance: 30 Year(s) [cite: 109]</p>
      [cite_start]<p>Inverter: 8 Year(s) [cite: 109]</p>
      [cite_start]<p>Balance Of System: 5 Year(s) [cite: 110]</p>
    </div>
  </div>

  <div style="page-break-before: always;"></div>

  <div class="max-w-2xl w-full mx-auto p-8 rounded-md shadow">
    <div class="flex justify-between items-center mb-6">
      [cite_start]<h1 class="text-2xl font-bold text-[#0a4b78]">Terms & Conditions [cite: 118]</h1>
      <img src="${API_URL}/assets/logo.png" class="h-16" />
    </div>

    <ul class="list-disc pl-6 text-sm text-gray-700 leading-relaxed space-y-1">
      [cite_start]<li>Packing is included in the offer[cite: 119].</li>
      [cite_start]<li>Transportation charges our scope[cite: 120].</li>
      [cite_start]<li>Civil and digging are at our scope[cite: 121].</li>
      [cite_start]<li>Prices quotes are firm and valid for 10 days from the date of offer[cite: 122]. [cite_start]After this period a reconfirmation from our office should be taken[cite: 123].</li>
      [cite_start]<li>Water supply at site will be provided by customer free of cost during the time of installation and commissioning[cite: 124].</li>
      [cite_start]<li>Closed, covered, locked stores will be provided by customer during the time of installation and commissioning[cite: 125].</li>
      [cite_start]<li>We will start the approval process as soon as we receive order conformation[cite: 126]. [cite_start]From the time of confirmation till 10 days before installation day 1, there will be a nominal cancellation charge of INR 25,000 or 5% of system cost, whichever is higher[cite: 127].</li>
      [cite_start]<li>Delivery: 2-3 weeks from the date of technically and commercially cleared order[cite: 128].</li>
      [cite_start]<li>Force Major clause: this quotation as well as the resulting contract are subject to the standard force majeure condition[cite: 129].</li>
      [cite_start]<li>Includes licensing charges[cite: 129].</li>
    </ul>
  </div>

  <div style="page-break-before: always;"></div>

  <div class="w-full h-screen relative font-sans">
    <div class="absolute top-40 left-10">
      <img src="${API_URL}/assets/logo.png" class="h-16" />
    </div>
    <img src = "${API_URL}/assets/Panel_logo.png" alt="Solar Panel" class="h-16"/>

    <div class="absolute top-12 right-10 text-sm text-gray-700 space-y-2 max-w-[200px]">
      [cite_start]<p>Address: 26/18 Laxmi Garden, Sector 11,<br>Gurgaon, Haryana 122001 [cite: 132, 133]</p>
      [cite_start]<p>Contact No: +919643800850 [cite: 133]</p>
      [cite_start]<p>Mail: info@sunmayo.com [cite: 134]</p>
      [cite_start]<p>Visit us on: www.sunmayo.com [cite: 134]</p>
    </div>

    <div class="absolute bottom-0 left-0 w-full">
      <img src="${API_URL}/assets/solar-panel.jpg" alt="Solar" class="w-full h-[250px] object-cover" />
    </div>
  </div>
</body>
</html>
  `;
};

