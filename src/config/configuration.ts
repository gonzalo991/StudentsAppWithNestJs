// Configuración del uso de las variables de entorno para luego ser
// obtenidas por el modulo ConfigModule a través de su servicio ConfigService
export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || '0.0.0.0',
    database: {
        uri: process.env.DB_URI
    }
});