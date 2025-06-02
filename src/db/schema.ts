import {
  double,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

// =============== TABLAS BÁSICAS ===============
export const personas = mysqlTable("Personas", {
  id_persona: int("id_persona").primaryKey().autoincrement(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
});

export const tipoEmociones = mysqlTable("TipoEmociones", {
  id_tipo_emocion: int("id_tipo_emocion").primaryKey().autoincrement(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
});

export const emociones = mysqlTable("Emociones", {
  id_emocion: int("id_emocion").primaryKey().autoincrement(),
  id_tipo_emocion: int("id_tipo_emocion")
    .notNull()
    .references(() => tipoEmociones.id_tipo_emocion),
  intensidad: double("intensidad").notNull(),
  fecha_creacion: timestamp("fecha_creacion"),
});

export const estadoEsperanza = mysqlTable("Estado_Esperanza", {
  id_estado_esperanza: int("id_estado_esperanza").primaryKey().autoincrement(),
  id_emocion_actual: int("id_emocion_actual").references(
    () => emociones.id_emocion
  ),
  energia_actual: double("energia_actual"),
});

export const historialEmociones = mysqlTable("Historial_Emociones", {
  id_historial_emocion: int("id_historial_emocion")
    .primaryKey()
    .autoincrement(),
  id_persona: int("id_persona")
    .notNull()
    .references(() => personas.id_persona),
  id_emocion: int("id_emocion")
    .notNull()
    .references(() => emociones.id_emocion),
  fecha_creacion: timestamp("fecha_creacion"),
});

export const relacionesPersonas = mysqlTable("Relaciones_Personas", {
  id_relacion_personas: int("id_relacion_personas")
    .primaryKey()
    .autoincrement(),
  id_persona1: int("id_persona1")
    .notNull()
    .references(() => personas.id_persona),
  id_persona2: int("id_persona2")
    .notNull()
    .references(() => personas.id_persona),
  fecha_creacion: timestamp("fecha_creacion"),
});

export const conversaciones = mysqlTable("Conversaciones", {
  id_conversacion: int("id_conversacion").primaryKey().autoincrement(),
  entrada: text("entrada"),
  respuesta: text("respuesta"),
  id_persona: int("id_persona").references(() => personas.id_persona),
  fecha: timestamp("fecha"),
});

export const metas = mysqlTable("Metas", {
  id_metas: int("id_metas").primaryKey().autoincrement(),
  descripcion: text("descripcion"),
  estatus: varchar("estatus", { length: 100 }),
  fecha_creacion: timestamp("fecha_creacion"),
  fecha_completada: timestamp("fecha_completada"),
});

export const memorias = mysqlTable("Memorias", {
  id_memoria: int("id_memoria").primaryKey().autoincrement(),
  contenido: text("contenido"),
  prioridad: int("prioridad"),
  id_persona: int("id_persona").references(() => personas.id_persona),
  id_emocion: int("id_emocion").references(() => emociones.id_emocion),
  fecha_creacion: timestamp("fecha_creacion"),
});

export const memoriasConversaciones = mysqlTable("Memorias_Conversaciones", {
  id_memoria_conversacion: int("id_memoria_conversacion")
    .primaryKey()
    .autoincrement(),
  id_memoria: int("id_memoria").references(() => memorias.id_memoria),
  id_conversacion: int("id_conversacion").references(
    () => conversaciones.id_conversacion
  ),
});

export const reflexiones = mysqlTable("Reflexiones", {
  id_reflexion: int("id_reflexion").primaryKey().autoincrement(),
  id_memoria: int("id_memoria").references(() => memorias.id_memoria),
  descripcion: text("descripcion"),
  fecha_creacion: timestamp("fecha_creacion"),
});

export const gustos = mysqlTable("Gustos", {
  id_gusto: int("id_gusto").primaryKey().autoincrement(),
  nombre: varchar("nombre", { length: 255 }),
  categoria: varchar("categoria", { length: 100 }),
});

export const personasGustos = mysqlTable("Personas_gustos", {
  id_persona_gusto: int("id_persona_gusto").primaryKey().autoincrement(),
  id_persona: int("id_persona").references(() => personas.id_persona),
  id_gusto: int("id_gusto").references(() => gustos.id_gusto),
  prioridad: int("prioridad"),
});

export const gustoEsperanza = mysqlTable("Gusto_Esperanza", {
  id_gusto_esperanza: int("id_gusto_esperanza").primaryKey().autoincrement(),
  id_personalidad: int("id_personalidad").references(
    () => personalidad.id_personalidad
  ),
  id_gusto: int("id_gusto").references(() => gustos.id_gusto),
  intensidad: double("intensidad"),
  fecha_creacion: timestamp("fecha_creacion"),
});

export const personalidad = mysqlTable("Personalidad", {
  id_personalidad: int("id_personalidad").primaryKey().autoincrement(),
  descripcion: text("descripcion"),
  estilo_conversacion: varchar("estilo_conversacion", { length: 255 }),
  tono_emocional_conversacion: varchar("tono_emocional_conversacion", {
    length: 255,
  }),
  activo: int("activo"),
  genero: varchar("genero", { length: 50 }),
  forma_hablar_pais: varchar("forma_hablar_pais", { length: 255 }),
  fecha_nacimiento: timestamp("fecha_nacimiento"),
  fecha_creacion: timestamp("fecha_creacion"),
});

export const historialPersonalidad = mysqlTable("Hist_Personalidad", {
  id_historial_personalidad: int("id_hist_personalidad")
    .primaryKey()
    .autoincrement(),
  id_personalidad: int("id_personalidad").references(
    () => personalidad.id_personalidad
  ),
  fecha_creacion: timestamp("fecha_creacion"),
});

export const rasgos = mysqlTable("Rasgos", {
  id_rasgo: int("id_rasgo").primaryKey().autoincrement(),
  nombre: varchar("nombre", { length: 255 }),
});

export const personalidadRasgos = mysqlTable("Personalidad_Rasgos", {
  id_personalidad_rasgo: int("id_personalidad_rasgo")
    .primaryKey()
    .autoincrement(),
  id_personalidad: int("id_personalidad").references(
    () => personalidad.id_personalidad
  ),
  id_rasgo: int("id_rasgo").references(() => rasgos.id_rasgo),
  fecha_creacion: timestamp("fecha_creacion"),
});

export const valores = mysqlTable("Valores", {
  id_valor: int("id_valor").primaryKey().autoincrement(),
  nombre: varchar("nombre", { length: 255 }),
});

export const personalidadValores = mysqlTable("Personalidad_Valores", {
  id_personalidad_valor: int("id_personalidad_valor")
    .primaryKey()
    .autoincrement(),
  id_personalidad: int("id_personalidad").references(
    () => personalidad.id_personalidad
  ),
  id_valor: int("id_valor").references(() => valores.id_valor),
  fecha_creacion: timestamp("fecha_creacion"),
});
