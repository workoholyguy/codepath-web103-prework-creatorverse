import { useEffect } from 'react';
import { supabase } from '../client';

function TestConnection() {
    useEffect(() => {
        const testConnection = async () => {
            const { data, error } = await supabase.from('creators').select('*').limit(1);

            if (error) {
                console.error('Connection failed:', error.message);
            } else {
                console.log('Connection successful. Sample data:', data);
            }
        };

        // testConnection();
    }, []);

    return <div>Check console for Supabase connection test.</div>;
}

export default TestConnection;