import { useState } from 'react';
import { FaUserCircle, FaPaperPlane, FaArrowLeft, FaTrash, FaPlus } from 'react-icons/fa';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newContact, setNewContact] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Chef Antonio', text: 'Your order #1234 is being prepared!', time: '10:30 AM', unread: true, conversation: [
      { id: 1, from: 'Chef Antonio', text: 'Your order #1234 is being prepared!', time: '10:30 AM', isMe: false },
      { id: 2, from: 'Me', text: 'Great! How long will it take?', time: '10:32 AM', isMe: true },
      { id: 3, from: 'Chef Antonio', text: 'It will be ready in 15 minutes!', time: '10:33 AM', isMe: false }
    ]},
    { id: 2, sender: 'Support Team', text: 'Refund processed for order #1111', time: 'Yesterday', unread: false, conversation: [
      { id: 1, from: 'Support Team', text: 'Refund processed for order #1111', time: 'Yesterday', isMe: false },
      { id: 2, from: 'Me', text: 'Thank you!', time: 'Yesterday', isMe: true }
    ]},
    { id: 3, sender: 'Delivery Guy', text: 'I am outside.', time: 'Yesterday', unread: false, conversation: [
      { id: 1, from: 'Delivery Guy', text: 'I am outside.', time: 'Yesterday', isMe: false },
      { id: 2, from: 'Me', text: 'Coming down!', time: 'Yesterday', isMe: true }
    ]},
  ]);

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      const newMsg = {
        id: selectedChat.conversation.length + 1,
        from: 'Me',
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      
      const updatedMessages = messages.map(msg => {
        if (msg.id === selectedChat.id) {
          return {
            ...msg,
            conversation: [...msg.conversation, newMsg],
            text: messageText,
            time: 'Just now'
          };
        }
        return msg;
      });
      
      setMessages(updatedMessages);
      setSelectedChat({
        ...selectedChat,
        conversation: [...selectedChat.conversation, newMsg]
      });
      setMessageText('');
    }
  };

  const handleSelectChat = (msg) => {
    setSelectedChat(msg);
    // Mark as read
    const updatedMessages = messages.map(m => 
      m.id === msg.id ? { ...m, unread: false } : m
    );
    setMessages(updatedMessages);
  };

  const handleDeleteMessage = (msgId) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      setMessages(messages.filter(m => m.id !== msgId));
      if (selectedChat?.id === msgId) {
        setSelectedChat(null);
      }
    }
  };

  const handleStartNewMessage = () => {
    if (newContact.trim()) {
      const newId = Math.max(...messages.map(m => m.id)) + 1;
      const newMsg = {
        id: newId,
        sender: newContact,
        text: 'Start a conversation...',
        time: 'Just now',
        unread: false,
        conversation: []
      };
      setMessages([newMsg, ...messages]);
      setSelectedChat(newMsg);
      setShowNewMessage(false);
      setNewContact('');
    }
  };

  return (
    <div className="messages-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Messages</h2>
        <button 
          onClick={() => setShowNewMessage(true)}
          style={{ 
            background: '#F29F05', 
            color: '#fff', 
            border: 'none', 
            padding: '12px 20px', 
            borderRadius: '25px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600'
          }}
        >
          <FaPlus /> New Message
        </button>
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            background: '#fff', 
            padding: '30px', 
            borderRadius: '20px', 
            width: '400px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ marginBottom: '20px' }}>Start New Conversation</h3>
            <input 
              type="text" 
              placeholder="Enter contact name..."
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStartNewMessage()}
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '10px', 
                border: '1px solid #dfe6e9',
                marginBottom: '20px',
                outline: 'none'
              }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => { setShowNewMessage(false); setNewContact(''); }}
                style={{ 
                  background: '#dfe6e9', 
                  color: '#2d3436', 
                  border: 'none', 
                  padding: '10px 20px', 
                  borderRadius: '10px', 
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleStartNewMessage}
                style={{ 
                  background: '#F29F05', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '10px 20px', 
                  borderRadius: '10px', 
                  cursor: 'pointer'
                }}
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: selectedChat ? '1fr 2fr' : '1fr', gap: '20px', marginTop: '20px' }}>
        {/* Messages List */}
        <div className="messages-list" style={{ background: '#fff', borderRadius: '20px', padding: '20px', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '15px', fontSize: '1.1rem' }}>Conversations</h3>
          {messages.map(msg => (
              <div 
                key={msg.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px', 
                  padding: '15px', 
                  borderBottom: '1px solid #f1f2f6', 
                  background: msg.unread ? '#fff9e6' : selectedChat?.id === msg.id ? '#f8f9fa' : 'transparent',
                  borderRadius: '10px',
                  marginBottom: '5px',
                  position: 'relative'
                }}
              >
                  <div onClick={() => handleSelectChat(msg)} style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, cursor: 'pointer' }}>
                      <div style={{ fontSize: '2.5rem', color: '#dfe6e9' }}><FaUserCircle /></div>
                      <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                              <h4 style={{ fontWeight: '600' }}>{msg.sender}</h4>
                              <span style={{ fontSize: '0.8rem', color: '#a4b0be' }}>{msg.time}</span>
                          </div>
                          <p style={{ color: '#636e72', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.text}</p>
                      </div>
                      {msg.unread && <div style={{ width: '10px', height: '10px', background: '#F29F05', borderRadius: '50%' }}></div>}
                  </div>
                  <button 
                    onClick={() => handleDeleteMessage(msg.id)}
                    style={{ 
                      background: '#ff7675', 
                      color: '#fff', 
                      border: 'none', 
                      padding: '8px 10px', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    <FaTrash />
                  </button>
              </div>
          ))}
        </div>

        {/* Chat Box */}
        {selectedChat && (
          <div className="chat-box" style={{ background: '#fff', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', height: '600px' }}>
            {/* Chat Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingBottom: '15px', borderBottom: '2px solid #f1f2f6' }}>
              <button onClick={() => setSelectedChat(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#636e72' }}>
                <FaArrowLeft />
              </button>
              <div style={{ fontSize: '2rem', color: '#dfe6e9' }}><FaUserCircle /></div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '2px' }}>{selectedChat.sender}</h3>
                <span style={{ fontSize: '0.8rem', color: '#a4b0be' }}>Active now</span>
              </div>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }}>
              {selectedChat.conversation.map((msg) => (
                <div 
                  key={msg.id} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: msg.isMe ? 'flex-end' : 'flex-start',
                    marginBottom: '15px'
                  }}
                >
                  <div style={{ 
                    maxWidth: '70%',
                    padding: '12px 18px',
                    borderRadius: msg.isMe ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                    background: msg.isMe ? '#F29F05' : '#f1f2f6',
                    color: msg.isMe ? '#fff' : '#2d3436'
                  }}>
                    <p style={{ marginBottom: '5px' }}>{msg.text}</p>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div style={{ display: 'flex', gap: '10px', paddingTop: '15px', borderTop: '2px solid #f1f2f6' }}>
              <input 
                type="text" 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..." 
                style={{ 
                  flex: 1, 
                  padding: '12px 20px', 
                  borderRadius: '25px', 
                  border: '1px solid #dfe6e9', 
                  outline: 'none',
                  fontSize: '0.95rem'
                }} 
              />
              <button 
                onClick={handleSendMessage}
                style={{ 
                  background: '#F29F05', 
                  color: '#fff', 
                  border: 'none', 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
