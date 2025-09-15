const path = require("path");
const API_URL = process.env.VITE_API_URL;

module.exports = function generateSolarQuoteHTML(proposal) {
  return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Proposal - ${proposal.clientName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @page { size: A4; margin: 20mm; }
    </style>
  </head>
  <body class="font-sans text-gray-800 text-[12px] leading-relaxed">
    <div class="max-w-[800px] mx-auto">

      <!-- Header -->
      <header class="flex justify-between items-start mb-6">
        <img src="${API_URL}/assets/logo.png" class="h-16" />
        <div class="text-right text-[11px]">
          <strong class="text-[14px] block">SUNMAYO PRIVATE LIMITED</strong>
          26/18 Laxmi Garden, Sector 11, Gurgaon, Haryana 122001<br/>
          Contact: +91 9643800850<br/>
          Mail: info@sunmayo.com<br/>
          www.sunmayo.com
        </div>
      </header>

      <h1 class="text-center text-2xl font-bold text-[#0a4b78] border-b pb-2">SOLAR PROPOSAL</h1>
      <!-- Prepared Section -->
      <section class="bg-gray-100 p-3 rounded-md mt-3">
        <div class="flex justify-between gap-5">
          <div>
            <h2 class="font-bold text-3xl">Prepared For:</h2>
            ${proposal.clientName}<br/>
            ${proposal.clientPhone || ""}<br/>
            ${proposal.clientEmail || ""}<br/>
            ${proposal.clientAddress || ""}
          </div>
          <div class="text-right">
            <h2 class="font-bold text-3xl">Prepared By:</h2>
            SUNMAYO PRIVATE LIMITED<br/>
            26/18 Laxmi Garden, Sector 11, Gurgaon, Haryana 122001
          </div>
        </div>
      </section>
      <section class= "flex flex-col">
       <img class="w-full my-4" src="${API_URL}/assets/Panel_logo.png" />
        <img class="w-full my-4" src="${API_URL}/assets/solar-panel.jpg" />
      </section>

      <!-- Project -->
      <section class="mt-6">
        <h2 class="text-lg font-semibold text-[#0a4b78]"></h2>
        <p></p>
        <p><strong></strong></p>
      </section>
<div class="max-w-2xl w-full bg-white p-8 rounded-md shadow">
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-[#0a4b78]">Welcome</h1>
    <img src="${API_URL}/assets/logo.png" class="h-16" />
  </div>

  <!-- Name -->
  <div class="mb-10">
    <h2 class="text-2xl font-semibold mb-2">${proposal.clientName}</h2>
    <div class="h-1 w-10 bg-[#0a4b78] mb-6"></div>

    <!-- Letter Content -->
    <p class="mb-4 text-lg">
      Dear <strong>${proposal.clientName}</strong>
    </p>
    <p class="mb-4 text-xl">
      It has been a privilege to understand your requirement and give you the
      best solution for you. As required, we have committed to the highest
      level of quality. That’s why we select the best components and
      industry-leading performance models to ensure your system will produce
      optimally.
    </p>
    <p class="mb-4 text-xl">
      Our highly trained installation crews take pride in delivering beautiful
      well-made solar arrays. From the panels to the bolts on the roof, we’ll
      deliberately consider every piece of your installation so you can rest
      easy throughout its many years of service. We take great pride in our
      guarantee of complete customer satisfaction.
    </p>
    <p class="mb-4 text-xl">
      We are looking forward to help you and have a long-term relationship
      with you. Please go through the proposal and give us your feedback.
    </p>
  </div>

  <!-- Footer -->
  <div class="mt-8 text-lg">
    <p class="font-bold">Thanks & Regards,</p>
    <p class="font-medium">SunMayo Private Limited</p>
    <p class="text-lg">+91 9971490782</p>
    <p class="uppercase font-semibold">SUNMAYO PRIVATE LIMITED</p>
  </div>
</div>

<!-- Force new page in PDF -->
<div style="page-break-before: always;"></div>

<div class="max-w-2xl w-full bg-white p-8">
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-[#0a4b78]">About Us</h1>
    <img src="${API_URL}/assets/logo.png" class="h-16" />
  </div>

  <!-- Letter Content -->
  <p class="mb-4 text-lg">
    At SUNMAYO PRIVATE LIMITED, we are committed to empowering homes
    and businesses with clean, reliable, and affordable solar energy. As a
    trusted solar installer, we specialize in designing and delivering
    customized solar solutions that meet the unique energy needs of our
    customers.
  </p>
  <p class="mb-4 text-lg">
    With years of industry experience and a passion for sustainability, our team
    of certified professionals ensures every installation is completed with
    precision, efficiency, and care. From initial consultation to post-installation
    support, we guide our clients every step of the way to make the transition
    to solar seamless and rewarding.
  </p>
  <p class="mb-4 text-lg">
    Our mission is simple: to help build a greener future while reducing energy
    costs and increasing energy independence for our customers. Backed by
    the latest technology, quality materials, and a customer-first approach, we
    aim to be your long-term energy partner
  </p>
  <p class="mb-4 text-lg">
    Let’s power a brighter tomorrow together.
  </p>

  <p class="font-bold text-xl">Why Choose SUNMAYO PRIVATE LIMITED ?</p>
  <ul class="text-lg list-disc pl-6">
    <li>Expert Solar Specialists</li>
    <li>Customized Solutions</li>
    <li>Proven Success</li>
    <li>Customer-Centric Approach</li>
    <li>Cost-Effective Solutions</li>
  </ul>

  <!-- Footer -->
  <div class="mt-8 text-lg">
    <p class="font-bold">Thanks & Regards,</p>
    <p class="font-medium">SunMayo Private Limited</p>
    <p class="text-lg">+91 9971490782</p>
    <p class="uppercase font-semibold">SUNMAYO PRIVATE LIMITED</p>
  </div>
</div>

<!-- Project Details -->
<div style="page-break-before: always;"></div>
   <div class="max-w-3xl w-full bg-white p-10 text-lg ">
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <div>
      <h1 class="text-3xl font-bold text-[#0a4b78]">${proposal.specification || 0}KW</h1>
      <p class="text-gray-600 text-xl">Specification</p>
    </div>
    <img src="${API_URL}/assets/logo.png" class="h-16" />
  </div>

  <!-- Specification Grid -->
  <div class="grid grid-cols-3 gap-6 mb-8">
    <div>
      <p class="text-gray-600">Plant Capacity:</p>
      <p class="font-bold text-[#0a4b78]">${proposal.specification || 0}KW</p>
    </div>
    <div>
      <p class="text-gray-600">Structure Type:</p>
      <p class="font-bold text-[#0a4b78]">Elevated</p>
    </div>
    <div>
      <p class="text-gray-600">Project Details:</p>
      <p class="font-bold text-[#0a4b78]">${proposal.name || "Project Name"}</p>
    </div>
  </div>

  <!-- Map + Design Preview -->
  <div class="grid grid-cols-2 gap-6 mb-10">
    <div>
      <img src="${API_URL}/assets/location.png" alt="Map" class="rounded-md shadow" />
    </div>
    <div class="flex items-center justify-center border border-dashed rounded-md bg-gray-50 text-center p-6">
      <div>
        <p class="text-xl font-semibold text-[#0a4b78]">Design Preview Unavailable</p>
        <p class="text-gray-500 text-sm mt-2">
          Your design hasn’t been saved yet.<br />
          Please save your progress to preview it here.
        </p>
      </div>
    </div>
  </div>

  <!-- Project + 3D Design -->
  <div class="grid grid-cols-2 gap-6">
    <div>
      <h2 class="text-lg font-semibold text-[#0a4b78]">Project Location</h2>
      <p class="text-gray-700 mt-2">
        ${proposal.projectDetails || "Your solar project is located at the specified address."}
      </p>
      <p class="mt-2"><strong>Budget:</strong> ₹${proposal.budget || 0}</p>
    </div>
    <div>
      <h2 class="text-lg font-semibold text-[#0a4b78]">3D Design</h2>
      <p class="text-gray-700 mt-2">
        View how the 550 Wp Premier Energies / Renew Power panels will be installed on your roof for maximum efficiency.
      </p>
    </div>
  </div>
</div>

<div style="page-break-before: always;"></div>


<!-- Commercial Offer -->
<img src="${API_URL}/assets/logo.png" class="h-16" />
<section class="mt-6">
  <h2 class="text-2xl font-bold text-[#0a4b78]">Commercial</h2>
  <p class="text-xl font-medium">Offer</p>
  <div class="w-12 h-[2px] bg-[#0a4b78] mt-1 mb-4"></div>

  <p class="text-sm mb-4">
    Price Quote & Payment schedule for <strong>${proposal.plantCapacity || "5 KW"} Grid Tie Rooftop Solar System:</strong>
  </p>

  <!-- Table -->
  <table class="w-full border-collapse text-sm">
    <thead class="bg-[#0a4b78] text-white">
      <tr>
        <th class="border p-2 text-left">Description</th>
        <th class="border p-2 text-right">Price per KW</th>
        <th class="border p-2 text-right">Quantity</th>
        <th class="border p-2 text-right">Subtotal</th>
      </tr>
    </thead>
    <tbody>
      ${proposal.products?.map(p => `
        <tr>
          <td class="border p-2">${p.name}</td>
          <td class="border p-2 text-right">₹${p.price}</td>
          <td class="border p-2 text-right">${p.qty}</td>
          <td class="border p-2 text-right">₹${(p.qty * p.price).toLocaleString()}</td>
        </tr>
      `).join("")}
      <tr>
        <td colspan="3" class="border p-2 font-medium">Subtotal</td>
        <td class="border p-2 text-right">₹${proposal.costs?.subtotal || 0}</td>
      </tr>
      <tr>
        <td colspan="3" class="border p-2 font-medium">Tax GST (${proposal.costs?.gstPercent || 0}%)</td>
        <td class="border p-2 text-right">₹${proposal.costs?.gstAmount || 0}</td>
      </tr>
      <tr class="font-semibold">
        <td colspan="3" class="border p-2">Total Cost</td>
        <td class="border p-2 text-right">₹${proposal.costs?.totalCost || 0}</td>
      </tr>
      <tr>
        <td colspan="3" class="border p-2">Subsidy</td>
        <td class="border p-2 text-right text-red-600">- ₹${proposal.costs?.subsidy || 0}</td>
      </tr>
      <tr class="bg-[#0a4b78] text-white font-bold">
        <td colspan="3" class="border p-2">Total</td>
        <td class="border p-2 text-right">₹${proposal.costs?.netPayable || 0}</td>
      </tr>
    </tbody>
  </table>

  <!-- Amount in words -->
  <div class="mt-2 text-sm font-medium">
    Amount in Words: ${proposal.costs?.amountInWords || ""}
  </div>

  <!-- Payment Schedule -->
  <section class="mt-6">
    <h3 class="text-lg font-semibold text-[#0a4b78]">Payment Schedule:</h3>
    <p class="text-sm leading-relaxed">
      As a percentage of the Net Value of System:
      ${proposal.paymentSchedule?.map(p => `${p.percent}% — ${p.stage}`).join(", ") ||
        "30% advance along with Purchase Order, 65% Before Dispatch, 5% after installation"}
    </p>
  </section>

  <!-- Bank Details -->
  <section class="mt-6">
    <h3 class="text-lg font-semibold text-[#0a4b78]">Payment Details:</h3>
    <p class="text-sm leading-relaxed">
      Payment can be made via Cheque / Netbanking.<br/>
      <strong>BANK DETAILS:</strong> IDFC FIRST BANK<br/>
      ACCOUNT NAME: SUNMAYO PRIVATE LIMITED<br/>
      ACCOUNT NO: 10223162147<br/>
      IFSC CODE: IDFB0021005<br/>
      BRANCH: SECTOR 15 GURGAON
    </p>
  </section>
</section>

  </body>
  </html>
  `;
};

