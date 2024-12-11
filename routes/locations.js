import { Router } from 'express';
import knexConfig from '../knexfile.mjs';
import knexPkg from 'knex';

const knex = knexPkg(knexConfig.development);

const router = Router();

router.get('/', async (req, res) => {
  try {
    // Fetch locations from the database
    const locations = await knex('stations').select('*');

    // Format data according to OCPI specification
    const formattedLocations = locations.map((location) => ({
      id: location.id.toString(),
      name: location.name,
      address: location.address,
      coordinates: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      evses: [
        {
          id: '1', // Replace or extend this based on your schema
          status: 'AVAILABLE', // Replace with actual status from the database if available
          connectors: [
            {
              id: '1',
              type: 'Type2', // Replace with actual connector type from the database
              max_power: 22, // Replace with actual max power from the database
            },
          ],
        },
      ],
    }));

    res.json({
      data: formattedLocations,
      status_code: 1000,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({
      status_code: 3000,
      message: 'Server error',
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
