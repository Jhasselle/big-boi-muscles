import { AsyncStorage } from 'react-native';
import * as SQLite from 'expo-sqlite';
import uuid from 'react-uuid';

// Constants
const db = SQLite.openDatabase("exermasizes.db");

export default class Store {

    // Initialization
    static instance = null;
    static _constant_check_first_app_run = "initialized";

    // State
    static isReady = false;

    static getInstance(requester = 'unknown') {
        if (Store.instance == null) {
            Store.initialize_store();
            Store.instance = new Store();
        }
        return this.instance;
    }

    static async initialize_store() {
        try {
            await Store.initialize_database_check()
            let value = await AsyncStorage.getItem(this._constant_check_first_app_run);
            if (value === null) {
                await AsyncStorage.setItem(this._constant_check_first_app_run, 'true');
            }
            this.isReady = true;
        }
        catch (error) {
            console.log('Yikes, how\'d this happen? ', error);
        }
    }

    // Checks to see if the app has been initialized.
    // The app as been initialized if the app_metadata table exists.
    // If it does not exist, then we create it.
    static async initialize_database_check() {
        db.transaction(tx => {
            tx.executeSql(
                `select * from sqlite_master where type='table' and name='app_metadata';`,
                [],
                (_, { rows: { _array } }) => {
                    if (_array.length == 0) {
                        Store.create_app_tables();
                    }
                },
                Store.fail
            );
        });
    }

    static async create_app_tables() {
        console.log('create_app_tables()');
        db.transaction(tx => {
            tx.executeSql("create table if not exists app_metadata (\
                id integer primary key not null, \
                time_created int, \
                user_id text, \
                version float);",
                []
            );
            tx.executeSql("create table if not exists workouts (\
                id integer primary key not null, \
                uuid text,\
                name text,\
                last_workout int,\
                exercise_reference_array text,\
                workout_days_array text \
                );",
                []
            );
            tx.executeSql("create table if not exists exercises (\
                id integer primary key not null,\
                uuid text,\
                workout_uuid,\
                name text,\
                weight int, \
                num_of_sets int, \
                num_of_reps int, \
                equipment_photo_reference text,\
                seconds_of_rest int\
                );",
                []
            );
        });
    }

    getAllWorkouts = async (callback) => {
        db.transaction(tx => {
            tx.executeSql(
                `select * from workouts;`,
                [],
                (_, { rows: { _array } }) => {
                    callback(_array);
                }
            );
        });
    }

    createWorkout = async (workout_name, callback) => {
        const new_uuid = uuid()
        db.transaction(tx => {
            tx.executeSql('insert into workouts (uuid, name) values (?, ?);',
                [new_uuid, workout_name],
                Store.success,
                (_, error) => { console.log(error); }
            );
            tx.executeSql(
                `select * from workouts where uuid=?;`,
                [new_uuid],
                (_, { rows: { _array } }) => {
                    callback(_array[0].uuid);
                },
                (_, error) => { console.log(error); }
            );
        });
    }

    getExercises = async (workoutUUID, callback) => {
        db.transaction(tx => {
            tx.executeSql(
                `select * from exercises where workout_uuid=?;`,
                [workoutUUID],
                (_, { rows: { _array } }) => {
                    callback(_array);
                }
            );
        });
    }

    createExercise = async (workoutUUID, exerciseName, exerciseWeight, exerciseReps, exerciseSets, exerciseRest, callback) => {
        const new_uuid = uuid()
        db.transaction(tx => {
            tx.executeSql('insert into exercises (uuid, workout_uuid, name, weight, num_of_sets, num_of_reps, seconds_of_rest)\
                 values (?, ?, ?, ?, ?, ?, ?);',
                [new_uuid, workoutUUID, exerciseName, exerciseWeight, exerciseSets, exerciseReps, exerciseRest],
                Store.success,
                (_, error) => { console.log(error); }
            );
            tx.executeSql(
                `select * from exercises where workout_uuid=?;`,
                [workoutUUID],
                (_, { rows: { _array } }) => {
                    callback(_array);
                }
            );
        });
    }

    nukeDatabase = async () => {
        console.log('Nuking Database...')
        db.transaction(tx => {
            tx.executeSql("drop table if exists app_metadata;");
            tx.executeSql("drop table if exists workouts;");
            tx.executeSql("drop table if exists exercises;");

        });
        await AsyncStorage.clear();
    }

    printAllTables = async () => {
        db.transaction(tx => {
            tx.executeSql(
                `select * from sqlite_master where type='table';`,
                [],
                (_, { rows: { _array } }) => { console.log(_array) },
                Store.fail
            );
        });
    }


    static success() {
        // console.log('success')
    }

    static fail() {
        console.log('fail');
    }
}