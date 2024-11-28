import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Collection
const refrigeratorCollection = "Heladeras";

// Schema for refrigerators
const refrigeratorSchema = new mongoose.Schema({
  marca: {
    type: String,
    requred: true,
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
  aplicacion: {
    type: String,
    enum: ["familiar", "comercial"],
    required: true,
  },
  sistema: {
    type: String,
    enum: ["ciclica", "no frost"],
    required: true,
  },
  dimensiones: {
    alto: {
      type: Number,
    },
    ancho: {
      type: Number,
    },
    profundidad: {
      type: Number,
    },
  },
  funcionalidad: {
    type: String,
    enum: [
      "refrigerador",
      "refrigerador con congelador",
      "refrigerador con freezer",
      "freezer",
      "exibidora",
    ],
  },
  puertas: {
    type: Number,
  },
  distribucion: {
    type: String,
    enum: ["freezer arriba", "freezer abajo"],
  },
  volumen: {
    Type: Number,
  },
  amperaje: {
    type: Number,
  },
  repuestos: {
    refrigerante: {
      tipo: {
        type: String,
        required: true,
      },
      cant: {
        type: Number,
        required: true,
      },
    },
    motor: {
      marca: {
        type: String,
        required: true,
      },
      modelo: {
        type: String,
        required: true,
      },
    },
    termostato: {
      marca: {
        type: String,
      },
      modelo: {
        type: String,
      },
    },
    combistato: {
      marca: {
        type: String,
      },
      modelo: {
        type: String,
      },
    },
    termistor: {
      valor: {
        type: Number,
      },
    },
    damper: {
      type: String,
      enum: ["no", "mecanico", "electronico"],
    },
    placa_electronica: {
      type: String,
      enum: ["si", "no"],
    },
    timer: {
      type: String,
      enum: ["si", "no"],
    },
    resistencia: {
      type: String,
      enum: ["si", "no"],
    },
    fusible_termico: {
      type: String,
      enum: ["si", "no"],
    },
    bimetal: {
      valor: {
        type: Number,
      },
    },
    evaporador: {
      tipo: {
        type: String,
      },
      medidas: {
        type: String,
      },
    },
    condensador: {
      tipo: {
        type: String,
      },
      medidas: {
        type: String,
      },
    },
    forzador_freezer: {
      rotacion: {
        type: String,
        enum: ["horaria", "antihoraria"],
      },
      eje: {
        type: String,
        enum: ["corto", "largo"],
      },
    },
    forzador_refrigerador: {
      rotacion: {
        type: String,
        enum: ["horaria", "antihoraria"],
      },
      eje: {
        type: String,
        enum: ["corto", "largo"],
      },
    },
  },
  thumbnails: {
    type: [String],
  },
});

// Pagination
refrigeratorSchema.plugin(mongoosePaginate);

// Model creates
const Refrigerator = mongoose.model(refrigeratorCollection, refrigeratorSchema);

export default Refrigerator;
