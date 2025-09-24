// template/solarQuoteTemplate.js
const API_URL = process.env.VITE_API_URL || "http://localhost:5000";

module.exports = function generateSolarQuoteHTML(proposal) {
  const tableImage = proposal.tableImage 
  ? (proposal.tableImage.startsWith("data:")
      ? proposal.tableImage   // already base64
      : `${API_URL}/api/proposal/table/${proposal.tableImage}`) 
  : null;

  const graphImageUrl = proposal.graphimage
    ? proposal.graphimage.startsWith("http") || proposal.graphimage.startsWith("data:")
      ? proposal.graphimage // already a full URL or base64
      : `${API_URL}/api/proposal/graph/${proposal.graphimage}` // construct URL from MongoDB _id
    : null;

  const graphHtml = graphImageUrl
    ? `<div>
         <h3 class="text-xl font-semibold mb-2 text-gray-700">Savings Graph</h3>
         <img src="${graphImageUrl}" alt="Graph Image" class="rounded-xl shadow-md border" />
       </div>`
    : "";

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
  <section class=" w-full min-h-screen bg-white p-8 font-sans">
    <!-- Top header -->
    <div class="flex item-right">
      <!-- Logo -->
      <div class="">
        <img src="${API_URL}/assets/logo.png" alt="Logo" class="w-32 h-auto" />
      </div>
    </div>
    <div class="text-center">
      <!-- Solar Text with Gradient -->
      <h1 class="text-6xl font-bold">
        <span class="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent relative">
          SOLAR
          <!-- Sun rays -->
          <span class="absolute -top-6 left-1/2 -translate-x-1/2 flex space-x-1">
            <span class="block w-1 h-4 bg-yellow-400 rotate-[10deg]"></span>
            <span class="block w-1 h-6 bg-yellow-400 rotate-[25deg]"></span>
            <span class="block w-1 h-8 bg-yellow-400 rotate-[40deg]"></span>
            <span class="block w-1 h-10 bg-yellow-400 rotate-[55deg]"></span>
            <span class="block w-1 h-10 bg-yellow-400 rotate-[125deg]"></span>
            <span class="block w-1 h-8 bg-yellow-400 rotate-[140deg]"></span>
            <span class="block w-1 h-6 bg-yellow-400 rotate-[155deg]"></span>
            <span class="block w-1 h-4 bg-yellow-400 rotate-[170deg]"></span>
          </span>
        </span>
      </h1>

      <!-- Proposal Text -->
      <h2 class="text-5xl font-bold text-blue-600 mt-2 tracking-wide">
        PROPOSAL
      </h2>
    </div>
    <!-- Prepared by / Prepared for -->
    <div class="flex flex-row justify-between mt-10 mx-10">
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
          <div class="font-medium"> ${proposal.clienttitle} ${proposal.clientName}</div>
          <div class="flex items-center gap-2 text-gray-600"><img src="${API_URL}/assets/phone-call.png" alt=""
              class="w-4 h-4">${proposal.clientPhone}</div>
          <div class="flex items-center gap-2 text-gray-600"> <img src="${API_URL}/assets/communication.png" alt=""
              class="w-4 h-4">${proposal.clientEmail}</div>
          <div class="flex items-center gap-2 text-gray-600"><img src="${API_URL}/assets/placeholder.png" alt=""
              class="w-4 h-4">${proposal.clientAddress}</div>
        </div>
      </div>
    </div>

    <!-- Hero images -->
    <div class="mt-10 rounded-xl overflow-hidden shadow-lg bg-gray-50">
      <img src="${API_URL}/assets/Solar_Proposal.jpg" class="w-full h-72 object-cover" alt="Hero" />
      
    </div>

    <!-- Footer -->
    <div class="mt-8 text-sm text-gray-500 text-center border-t pt-4">
      Page 1 • Cover
    </div>
  </section>


  <!-- PAGE 2: WELCOME -->
  <section class="page">
    <h2 class="text-3xl font-bold text-center"><span class="text-blue-800">Welcome</span></h2>
    <h2 class="text-3xl font-semibold mt-3">${proposal.clienttitle} ${proposal.clientName}</h2>
    <div class="mt-4 text-2xl">Dear <span class="font-semibold">${proposal.clientName}</span>,</div>
    <p class="mt-4 leading-6 text-xl">
      It has been a privilege to understand your requirement and give you the best solution for you. As required, we
      have committed to the highest levelof quality. That’s why we select the best components and industry-leading
      performance models to ensure your system will produce optimally. Our highly trained installation crews take pride
      in delivering beautiful well-made solar arrays. From the panels to the bolts on the roof, we’ll deliberately
      consider every piece of your installation so you can rest easy throughout its many years of service. We take great
      pride in our guarantee of complete customer satisfaction.
      We are looking forward to help you and have a long-term relationship with
      you. Please go through the proposal and give us your feedback.
    </p>
    <ul class="list-disc ml-6 mt-4 text-xl">
      <li>High-efficiency panels with long term performance warranty.</li>
      <li>Robust hot-dip galvanised elevated structure.</li>
      <li>Turnkey installation with quality-tested BOS components.</li>
    </ul>
    <div class="mt-8 text-xl">
      <div class=" font-bold">
        Thanks & Regards,
        <div class="font-semibold">SUNMAYO PRIVATE LIMITED</div>
        <div class="text-lg">26/18 Laxmi Garden, Sector 11, Gurgaon, Haryana 122001</div>
        <div class="text-lg"><img src="${API_URL}/assets/phone-call.png" alt="Logo" class="size-2" /> +91 9643800850
        </div>
        <div class="text-lg"><img src="${API_URL}/assets/communication.png" alt="Logo" class="size-2" />
          info@sunmayo.com </div>
        <div class="text-lg"><img src="${API_URL}/assets/worldwide.png" alt="Logo" class="size-2" /> www.sunmayo.com
        </div>
        <div class="flex flex-row justify-between">
          <img src="${API_URL}/assets/design.png" alt="" class="w-32 h-auto">
          <img src="${API_URL}/assets/design.png" alt="" class="w-32 h-auto transform -scale-x-100">
        </div>
        <div class="page-footer">Page 2 • Welcome</div>
  </section>

  <!-- PAGE 3: SPECIFICATION & SAVINGS -->
  <section class="page">
    <h2 class="text-2xl font-bold"><span class="text-blue-800">Specifications</span> & Savings</h2>
    <div class="mt-4 grid grid-cols-3 gap-4 text-xl">
      <div>
        <p class="font-semibold">Plant Capacity</p>
        <p>${proposal.projectsize} kW</p>
        <div class="bg-blue-700 w-44 h-1"></div>
      </div>
      <div>
        <p class="font-semibold">Structure Type</p>
        <p>${proposal.proposalStructure}</p>
        <div class="bg-blue-700 w-44 h-1"></div>
      </div>
      <div>
        <p class="font-semibold">Inverter</p>
        <p>${proposal.invertortype || proposal.InvertorSize}</p>
        <div class="bg-blue-700 w-44 h-1"></div>
      </div>
    </div>
    <div class="mt-4 text-xl flex flex-row justify-between font-semibold">
      <div class="flex-col flex">
        <img src="${API_URL}/assets/solar-power-plant.svg" alt="" class="logo" />
        <div>
          <span> Yearly consumption:</span><br /> <span class="font-bold">${proposal.yearlyconsumption} kWh</span><br />
        </div>
        <div>
          <div class="flex-col flex">
            <img src="${API_URL}/assets/solar-generation.svg" alt="" class="logo" />
            <div>
              <span>Estimated yearly solar generation: </span><br /><span
                class="font-bold">${proposal.yearlysolargeneration} kWh</span>
            </div>
            <div>
            </div>
            <div class="mt-8">
              ${graphHtml}

            </div>
            <div class="flex flex-row justify-between">
              <img src="${API_URL}/assets/design.png" alt="" class="w-32 h-auto">
              <img src="${API_URL}/assets/design.png" alt="" class="w-32 h-auto transform -scale-x-100">
            </div>

            <div class="page-footer">Page 3 • Specs & Savings</div>
  </section>

  <!-- PAGE 4: COMMERCIAL OFFER -->
  <section class="page">
    <h2 class="text-2xl font-bold">Commercial Offer & Payment</h2>
    ${tableImage ? `<img src="${tableImage}" alt="Table Image" />` : ""}
    <div class="mt-4 text-xl">
      <div class="font-bold">Payment Schedule </div>
      <ul>
        <li> As a percentage of the Net Value of System.</li>
        <li> 30% advance along with PurchaseOrder.</li>
        <li> 65% Before the Dispatch of material Balance 05% after installation and commissioning.</li>
      </ul>
    </div>
    <div class="mt-4 text-xl">
      <div class="font-bold">Payment Details: </div>
      <p> Payment can be paid in Cheque/ scanner code/ Netbanking</p>
      <span class="font-semibold">Bank:</span> IDFC FIRST BANK<br />
      <span class="font-semibold">A/C:</span> SUNMAYO PRIVATE LIMITED — 10223162147<br />
      <span class="font-semibold">IFSC:</span> IDFB0021005
    </div>
    <div class="mt-6 text-base">
      Terms: Prices are firm for 10 days from offer date. Delivery 2–3 weeks. Force majeure applies.
    </div>
    <div class="page-footer">Page 4 • Commercial</div>
  </section>

  <!-- PAGE 5: BILL OF MATERIALS -->
  <section class="page">
    <h2 class="text-2xl font-bold">Bill of Materials</h2>
    <div class="mt-4 text-xl">
      Watt Peak: ${proposal.Wattpeak} Wp<br />
      Panel Qty: ${proposal.quantity} Nos<br />
      Panel type: ${proposal.paneltype} <br />
    </div>
    <div class="bg-blue-700 w-11/12 h-1"></div>
    <div class="mt-4 text-xl">
      Inverter: ${proposal.InvertorSize} kW<br />
      Phase: ${proposal.invertorPhase}<br />
      Phase QTY: ${proposal.invertorquantitiy} yrs<br />
    </div>
    <div class="bg-blue-700 w-11/12 h-1"></div>
    <div class="flex flex-row justify-between text-xl">
      <div class="flex flex-row">
        <div>
          <span class="text-blue-700 text-2xl"> Cable</span><br />
          Cable brand: ${proposal.cableBrands}
        </div>
        <div class="bg-blue-700 w-1 h-44"></div>
      </div>
      <div>
        <span class="text-blue-700 text-2xl">Warranty</span><br />
        Panel: ${proposal.warranty} Year(s)<br />
        Panel Performance : ${proposal.performancewarranty} Years(s)<br />
        Invertor : ${proposal.Invertorwarranty}Year(s)<br />
        Balance of System: ${proposal.systemwarranty} Year(s)<br />
      </div>
    </div>
    <div class="mt-4 text-xl">
      Balance of System:<br />${proposal.balanceOfSystem}
    </div>
    <div class="page-footer">Page 5 • Bill of Materials</div>
    <div class="flex flex-row justify-between">
      <img src="${API_URL}/assets/design.png" alt="" class="w-32 h-auto">
      <img src="${API_URL}/assets/design.png" alt="" class="w-32 h-auto transform -scale-x-100">
    </div>


  </section>

  <!-- PAGE 6: SCOPE & ACCEPTANCE -->
  <section class="page">
    <div class="text-xl">
      <span class="font-bold"> Term & Condition</span><br />
      <ol>
        <li>Packing is included in the offer. </li>
        <li>Transportation charges our scope. </li>
        <li>Civil and digging are at our scope. </li>
        <li>Prices quotes are firm and valid for 10 days from the date of offer. After this period a reconfirmation from
          our office should be taken. </li>
        <li>Water supply at site will be provided by customer free of cost during the time of installation and
          commissioning. </li>
        <li>Closed, covered, locked stores will be provided by customer during the time of installation and
          commissioning. </li>
        <li>We will start the approval process as soon as we receive order conformation. From the time of confirmation
          till 10 days before installation day 1, there will be a nominal cancellation charge of INR 25,000 or 5% of
          system cost, whichever is higher. </li>
        <li>Delivery: 2-3 weeks from the date of technically and commercially cleared order. </li>
        <li>Force Major clause: this quotation as well as the resulting contract are subject to the standard force
          majeure condition </li>
        <li>Include lesining charges </li>
        </0l>
    </div>
    <div class="mt-8 grid grid-cols-2 gap-6">
      <img src="${API_URL}/assets/generate_logo.jpg" alt="Logo" class="w-full h-32" />
    </div>
    <div class="mt-8 text-xl">
      <div class=" font-bold">
        Thanks & Regards, </div>
      <div class="font-semibold">SUNMAYO PRIVATE LIMITED</div>
      <div class="text-lg">26/18 Laxmi Garden, Sector 11, Gurgaon, Haryana 122001</div>
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

      <div class="mt-4 text-xs">Date: ____________________</div>
       <div class="flex flex-row justify-between">
      <img src="${API_URL}/assets/design.png" alt="" class="w-32 h-auto">
      <img src="${API_URL}/assets/design.png" alt="" class="w-32 h-auto transform -scale-x-100">
    </div>
      <div class="page-footer">Page 6 • Scope & Acceptance</div>
  </section>

</body>

</html>
`;
};
