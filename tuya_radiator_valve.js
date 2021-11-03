// external converter for _TZE200_hue3yfsn based on TV01-ZB (_TZE200_e9ba97vf) from moes

const fz = {...require('zigbee-herdsman-converters/converters/fromZigbee'), legacy: require('zigbee-herdsman-converters/lib/legacy').fromZigbee};
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const globalStore = require('zigbee-herdsman-converters/lib/store');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const e = exposes.presets;
const ea = exposes.access;
 
const device = {
    fingerprint: [{modelID: 'TS0601', manufacturerName: '_TZE200_hue3yfsn'}],
    model: 'TS0601',
    vendor: 'Tuya',
    description: 'Thermostat radiator valve',
    fromZigbee: [fz.moes_thermostat_tv, fz.ignore_tuya_set_time],
    toZigbee: [tz.moes_thermostat_tv],
    exposes: [
        e.battery(), 
        // e.child_lock(), 
        // e.window_detection(),
        // exposes.binary('frost_detection', ea.STATE_SET, true, false).withDescription('Enables/disables frost detection on the device'),
        exposes.binary('heating_stop', ea.STATE_SET, true, false).withDescription('Stop heating'),
        exposes.numeric('holiday_temperature', ea.STATE_SET).withDescription('Holiday mode temperature'),
        exposes.numeric('comfort_temperature', ea.STATE_SET).withDescription('Comfort mode temperature'),
        exposes.numeric('eco_temperature', ea.STATE_SET).withDescription('Eco mode temperature'),
        exposes.numeric('open_window_temperature', ea.STATE_SET).withDescription('Open window mode temperature'),
        // exposes.numeric('boost_heating_countdown', ea.STATE).withDescription('Boost heating countdown'),
        // exposes.numeric('error_status', ea.STATE).withDescription('Error status'),
        // exposes.binary('boost_mode', ea.STATE_SET).withDescription('Enables/disables boost mode'),
        exposes.climate().withSetpoint('current_heating_setpoint', 5, 29.5, 1, ea.STATE_SET)
            .withLocalTemperature(ea.STATE).withLocalTemperatureCalibration(ea.STATE_SET)
            .withSystemMode(Object.values(tuya.tvThermostatMode), ea.STATE_SET)
            .withPreset(Object.values(tuya.tvThermostatPreset)),
    ],
    onEvent: tuya.onEventSetLocalTime,
};
 
module.exports = device;
 
