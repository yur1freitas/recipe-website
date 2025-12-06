import Cap from '@cap.js/server'

import Database from 'libsql'

const db = new Database(':memory:')

db.exec(`
  CREATE TABLE IF NOT EXISTS challenges (
    token TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    expires INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS tokens (
    key TEXT PRIMARY KEY,
    expires INTEGER NOT NULL
  );
`)

export const cap = new Cap({
    storage: {
        challenges: {
            store: async (token, challengeData) => {
                db.prepare(
                    'INSERT OR REPLACE INTO challenges (token, data, expires) VALUES (?, ?, ?)'
                ).run(
                    token,
                    JSON.stringify(challengeData),
                    challengeData.expires
                )
            },
            read: async (token) => {
                const row = db
                    .prepare(
                        'SELECT data, expires FROM challenges WHERE token = ? AND expires > ?'
                    )
                    .get(token, Date.now())

                return row
                    ? { challenge: JSON.parse(row.data), expires: row.expires }
                    : null
            },
            delete: async (token) => {
                db.prepare('DELETE FROM challenges WHERE token = ?').run(token)
            },
            deleteExpired: async () => {
                db.prepare('DELETE FROM challenges WHERE expires <= ?').run(
                    Date.now()
                )
            }
        },
        tokens: {
            store: async (tokenKey, expires) => {
                db.prepare(
                    'INSERT OR REPLACE INTO tokens (key, expires) VALUES (?, ?)'
                ).run(tokenKey, expires)
            },
            get: async (tokenKey) => {
                const row = db
                    .prepare(
                        'SELECT expires FROM tokens WHERE key = ? AND expires > ?'
                    )
                    .get(tokenKey, Date.now())

                return row ? row.expires : null
            },
            delete: async (tokenKey) => {
                db.prepare('DELETE FROM tokens WHERE key = ?').run(tokenKey)
            },
            deleteExpired: async () => {
                db.prepare('DELETE FROM tokens WHERE expires <= ?').run(
                    Date.now()
                )
            }
        }
    }
})
