import {model, Schema} from "mongoose"

const MensajeSchema = new Schema({
  mensaje: { type: String, required: true },
  from: { type: String, required: true,},
});

export default model("Mensaje", MensajeSchema);