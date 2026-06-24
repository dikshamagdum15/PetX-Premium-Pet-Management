const mockVets = [
  {
    id: 1,
    name: 'Paws & Claws Veterinary',
    address: '123 Pet Street, Downtown',
    phone: '(555) 123-4567',
    distance: '0.8 miles',
    rating: 4.8,
    hours: 'Mon-Fri: 8AM-6PM',
    services: ['General Checkup', 'Surgery', 'Dental'],
    emergency: true,
    coordinates: { lat: 40.7128, lng: -74.006 }
  },
  {
    id: 2,
    name: 'Happy Tails Animal Hospital',
    address: '456 Bark Avenue, Midtown',
    phone: '(555) 234-5678',
    distance: '1.2 miles',
    rating: 4.9,
    hours: 'Mon-Sat: 7AM-8PM',
    services: ['Vaccination', 'Grooming', 'Boarding'],
    emergency: true,
    coordinates: { lat: 40.7580, lng: -73.9855 }
  },
  {
    id: 3,
    name: 'Furry Friends Clinic',
    address: '789 Whiskers Way, Uptown',
    phone: '(555) 345-6789',
    distance: '2.1 miles',
    rating: 4.6,
    hours: 'Mon-Fri: 9AM-5PM',
    services: ['Wellness Exam', 'Nutrition', 'Behavioral'],
    emergency: false,
    coordinates: { lat: 40.7831, lng: -73.9712 }
  },
  {
    id: 4,
    name: 'PetCare 24/7 Emergency',
    address: '321 Emergency Lane, Westside',
    phone: '(555) 456-7890',
    distance: '3.5 miles',
    rating: 4.7,
    hours: '24/7',
    services: ['Emergency Care', 'Critical Care', 'ICU'],
    emergency: true,
    coordinates: { lat: 40.7282, lng: -74.0776 }
  },
  {
    id: 5,
    name: 'Gentle Paws Veterinary',
    address: '654 Care Circle, Eastside',
    phone: '(555) 567-8901',
    distance: '1.8 miles',
    rating: 4.5,
    hours: 'Mon-Sat: 8AM-7PM',
    services: ['General Practice', 'Spay/Neuter', 'Microchipping'],
    emergency: false,
    coordinates: { lat: 40.7505, lng: -73.9934 }
  }
];

exports.getNearbyVets = async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    let vets = [...mockVets];
    if (lat && lng) {
      vets = vets.sort((a, b) => parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0])); // Parse distance as float for correct sorting
    }
    res.json({ success: true, count: vets.length, vets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVetById = async (req, res) => {
  try {
    const vet = mockVets.find(v => v.id === parseInt(req.params.id));
    if (!vet) return res.status(404).json({ message: 'Vet not found' });
    res.json({ success: true, vet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createVet = async (req, res) => {
  try {
    const newVet = {
      id: mockVets.length + 1,
      ...req.body,
      distance: '0.0 miles' // Default distance for manually added vets
    };
    mockVets.push(newVet);
    res.status(201).json({ success: true, vet: newVet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
