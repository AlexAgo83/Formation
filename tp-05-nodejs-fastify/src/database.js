import Database from 'better-sqlite3';
import { RecordNotFoundError } from './errors/RecordNotFoundError.js'


const db = new Database('database.db');

export function getAllPosts() {
    return db.prepare('SELECT * FROM posts').all()
}

export function getPostById(id) {
    const e = db.prepare('SELECT * FROM posts WHERE post_id = ?').get(id)
    if (e === undefined)
        throw new RecordNotFoundError(`Enregistrement introuvable, id: ${id}`)
    return e
}