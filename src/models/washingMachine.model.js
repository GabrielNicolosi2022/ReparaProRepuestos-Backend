import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Collection
const washingMachineCollection = "Lavarropas";

// Schema for washing machines
const washingMachineSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  fabricante: {
    type: String,
  },
  tecnologia: {
    type: String,
    enum: ["convencional", "inverter"],
    required: true,
  },
  carga_tipo: {
    type: String,
    enum: ["frontal", "superior"],
    required: true,
  },
  eje: {
    type: String,
    enum: ["vertical", "horizontal"],
    required: true,
  },
  sist_lavado: {
    type: String,
    enum: ["europeo", "americano", "asiatico"],
  },
  capacidad: {
    type: Number,
    required: true,
  },
  rpm_centrif: {
    type: Number,
    required: true,
  },
  modo_service: {
    type: String,
  },
  repuestos: {
    programador_tipo: {
      type: String,
      enum: ["mecanico", "placa electronica"],
    },
    rodamientos: {
      type: [Number],
    },
    reten: {
      type: String,
    },
    eje: {
      type: String,
    },
    brida: {
      type: String,
    },
    electrovalvula: {
      type: String,
    },
    bomba_desagote: {
      type: String,
    },
    amortiguadores: {
      type: String,
    },
    motor: {
      type: String,
      required: true,
    },
    fuelle: {
      type: String,
    },
    polea: {
      type: String,
    },
    correa: {
      type: Number,
    },
    capacitor: {
      type: String,
    },
  },
  thumbnails: {
    type: [String],
  },
});

// Pagination
washingMachineSchema.plugin(mongoosePaginate);

// Model create
const WashingMachine = mongoose.model(
  washingMachineCollection,
  washingMachineSchema
);

export default WashingMachine;
