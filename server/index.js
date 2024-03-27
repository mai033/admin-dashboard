import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

// data imports
import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import {
  dataUser,
  dataProductStat,
  dataProduct,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from './data/index.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

const PORT = process.env.PORT || 9000;
const DOMAIN_NAME = process.env.DOMAIN_NAME;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      console.log(`Accessible at: https://${DOMAIN_NAME}`); // Log the domain name
    });

    // OverallStat.insertMany(dataOverallStat);
    // User.insertMany(dataUser)
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
