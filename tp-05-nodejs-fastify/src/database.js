import Database from 'better-sqlite3'

const db = new Database('database.db');

export function getAllPosts() {
    return db.prepare('SELECT * FROM posts').all()
}

export function getPostById(id) {
    return db.prepare('SELECT * FROM posts WHERE post_id = ?').get(id)
}