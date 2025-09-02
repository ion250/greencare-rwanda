const articles = [
  {
    title: "The Benefits of Organic Composting",
    description: "Discover how organic composting can transform your garden and contribute to a healthier environment.",
    content: `
      <p>Organic composting is one of the most effective ways to reduce waste and improve soil health. By transforming kitchen scraps and yard waste into nutrient-rich compost, we can create a closed-loop system that benefits both our gardens and the environment.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">Environmental Benefits</h3>
      <p>Composting reduces the amount of organic waste that ends up in landfills, where it would produce methane, a potent greenhouse gas. Instead, these materials are transformed into a valuable resource that improves soil structure, increases water retention, and reduces the need for chemical fertilizers.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">Garden Benefits</h3>
      <p>Compost enriches soil with essential nutrients and beneficial microorganisms that help plants grow stronger and more resistant to pests and diseases. It improves soil texture, making it easier for roots to penetrate and access water and nutrients.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">How to Start Composting</h3>
      <p>Starting a compost pile is simple. You'll need a mix of "green" materials (like fruit and vegetable scraps, coffee grounds, and grass clippings) and "brown" materials (like dried leaves, straw, and paper). Keep the pile moist and turn it regularly to provide oxygen to the microorganisms that break down the materials.</p>
      
      <p>With patience and proper maintenance, you'll have rich, dark compost ready to use in your garden in a few months. This natural fertilizer will help your plants thrive while reducing your environmental impact.</p>
    `,
    image: "/uploads/composting.jpg",
    author: "Sarah Johnson",
    slug: "the-benefits-of-organic-composting"
  },
  {
    title: "Innovative Plastic Recycling Solutions",
    description: "Learn about cutting-edge technologies that are transforming how we recycle and reuse plastic waste.",
    content: `
      <p>Plastic waste is one of the most pressing environmental challenges of our time. With millions of tons of plastic ending up in oceans and landfills each year, innovative recycling solutions are needed now more than ever.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">Advanced Sorting Technologies</h3>
      <p>Modern recycling facilities are using AI-powered sorting systems that can identify and separate different types of plastics with remarkable accuracy. These systems use near-infrared spectroscopy and machine learning algorithms to distinguish between various plastic resins, ensuring that materials are properly sorted for recycling.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">Chemical Recycling</h3>
      <p>Beyond traditional mechanical recycling, chemical recycling processes are emerging as game-changers. These technologies break down plastic polymers into their molecular components, which can then be used to create new plastics or other valuable chemicals. This approach allows for the recycling of plastics that would otherwise be unrecyclable.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">Community-Based Solutions</h3>
      <p>In Rwanda and other developing nations, community-based recycling initiatives are proving highly effective. By creating economic incentives for waste collection and providing training in proper sorting techniques, these programs are turning waste into a valuable resource while creating green jobs.</p>
      
      <p>At GreenCare Rwanda, we're implementing a combination of these approaches to maximize our impact. Our recycling pavers, made from post-consumer plastics, are just one example of how innovation can transform waste into useful products.</p>
    `,
    image: "/uploads/plastic-recycling.jpg",
    author: "Michael Chen",
    slug: "innovative-plastic-recycling-solutions"
  },
  {
    title: "Sustainable Farming Practices in Rwanda",
    description: "Exploring how Rwandan farmers are adopting eco-friendly methods to improve soil health and productivity.",
    content: `
      <p>Rwanda's agricultural sector is undergoing a transformation as farmers adopt sustainable practices that protect the environment while improving yields. With limited arable land and growing population pressures, innovative approaches are essential for food security.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">Conservation Agriculture</h3>
      <p>Many Rwandan farmers are embracing conservation agriculture principles, including minimum tillage, crop rotation, and permanent soil cover. These practices help prevent soil erosion on the country's steep hillsides, improve water retention, and increase soil fertility over time.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">Agroforestry</h3>
      <p>Integrating trees into farming systems is another key strategy. Farmers are planting nitrogen-fixing trees alongside crops, which improves soil fertility naturally. Fruit and timber trees provide additional income streams while helping to sequester carbon.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">Organic Inputs</h3>
      <p>With the rising cost of chemical fertilizers, many farmers are turning to organic alternatives like compost and biofertilizers. GreenCare Rwanda's Grekompost is playing a vital role in this transition, providing farmers with a high-quality, locally-produced soil amendment.</p>
      
      <p>These sustainable practices not only improve farm productivity but also enhance resilience to climate change. By working with nature rather than against it, Rwandan farmers are building a more sustainable agricultural future for generations to come.</p>
    `,
    image: "/uploads/sustainable-farming.jpg",
    author: "Jeanine Uwase",
    slug: "sustainable-farming-practices-in-rwanda"
  },
  {
    title: "The Circular Economy: Closing the Loop on Waste",
    description: "How GreenCare Rwanda is implementing circular economy principles to create a zero-waste future.",
    content: `
      <p>The concept of a circular economy represents a fundamental shift from our current linear "take-make-dispose" model to a more sustainable system where resources are kept in use for as long as possible.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">From Linear to Circular</h3>
      <p>Traditional waste management follows a linear path: raw materials are extracted, processed into products, used, and then discarded. In contrast, a circular economy aims to close this loop by designing out waste from the beginning and finding ways to reuse, repair, refurbish, and recycle materials.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">GreenCare's Circular Approach</h3>
      <p>At GreenCare Rwanda, we've implemented a circular system that transforms waste into valuable resources:</p>
      <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
        <li><strong>Organic waste</strong> → Grekompost → Fertilizer for agriculture</li>
        <li><strong>Plastic waste</strong> → Recycled pavers → Construction materials</li>
        <li><strong>Electronic waste</strong> → Component recovery → New electronics manufacturing</li>
      </ul>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">Economic Benefits</h3>
      <p>Beyond environmental advantages, the circular economy creates significant economic opportunities. By keeping materials in circulation, we reduce dependency on imported raw materials, create local green jobs, and stimulate innovation in recycling technologies.</p>
      
      <p>Our data shows that for every ton of waste processed through our circular system, we generate three times more economic value than traditional disposal methods while reducing environmental impact by 80%.</p>
    `,
    image: "/uploads/circular-economy.jpg",
    author: "David Mwangi",
    slug: "the-circular-economy-closing-the-loop-on-waste"
  },
  {
    title: "Urban Composting: Transforming City Waste",
    description: "How urban composting initiatives are reducing municipal waste and creating green spaces in cities.",
    content: `
      <p>As cities continue to grow, managing urban waste has become one of the most significant environmental challenges. Urban composting offers a sustainable solution that transforms organic waste from households, restaurants, and markets into valuable resources.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">The Urban Waste Challenge</h3>
      <p>Cities generate enormous amounts of organic waste daily. In Kigali alone, over 500 tons of organic waste are produced each day, much of which ends up in landfills where it produces methane, a greenhouse gas 25 times more potent than carbon dioxide.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">Community Composting Hubs</h3>
      <p>GreenCare Rwanda has established community composting hubs in several Kigali neighborhoods. These hubs collect organic waste from local households and businesses, process it into high-quality compost, and distribute it to urban farmers and community gardens.</p>
      
      <h3 class="text-xl font-bold text-green-800 mt-6 mb-3">Benefits for Cities</h3>
      <p>Urban composting provides multiple benefits:</p>
      <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
        <li><strong>Waste reduction:</strong> Diverts up to 60% of municipal waste from landfills</li>
        <li><strong>Green spaces:</strong> Provides nutrient-rich soil for urban agriculture and parks</li>
        <li><strong>Job creation:</strong> Creates green jobs in waste collection, processing, and distribution</li>
        <li><strong>Food security:</strong> Supports urban farming and local food production</li>
      </ul>
      
      <p>Our pilot program in the Nyamirambo district has reduced organic waste going to landfills by 45% while creating 15 new green jobs and supporting 3 community gardens that now produce fresh vegetables for over 200 families.</p>
    `,
    image: "/uploads/urban-composting.jpg",
    author: "Amina Hassan",
    slug: "urban-composting-transforming-city-waste"
  }
];

module.exports = articles;