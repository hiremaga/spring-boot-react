import React from 'react';
import { render } from 'enzyme';
import Message from '../../main/js/message.js';

describe('Message', function() {
    it('is the right message', () => {
        const wrapper = render(<Message />);
        expect(wrapper.text()).toEqual('Hello world!');
    });
});
